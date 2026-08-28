/**
 * Regra de negócio: resolução das opções de dia de vencimento oferecidas
 * na etapa Comercial da ficha de matrícula.
 *
 * Resumo da regra (versão flexível):
 * 1. Existe uma lista mestre de dias candidatos (ex: 5, 10, 15, 20, 25),
 *    configurável em src/data/diasVencimentoDisponiveis.js.
 * 2. Para cada dia, olhamos as ocorrências mensais a partir do mês
 *    seguinte (M+1, M+2, …) e escolhemos a MAIS DISTANTE que ainda caiba
 *    no limite de LIMITE_DIAS_PRIMEIRA_PARCELA. Ou seja: se a ocorrência
 *    de M+1 está muito perto (ex: matrícula dia 28, vencimento dia 5 do
 *    mês seguinte = só 8 dias), pulamos para M+2 quando ela couber no
 *    limite — a primeira parcela fica o mais à frente possível.
 * 3. Se NENHUMA ocorrência do dia couber no limite (nem a de M+1), o dia
 *    simplesmente não aparece. Nunca oferecemos data no mês atual (M0):
 *    ela poderia virar passado (ex: aba do form aberta por dias).
 * 4. Resultado ordenado por proximidade (data mais próxima primeiro),
 *    independente do número do dia — por isso meses podem aparecer
 *    entrelaçados (ex: 15/09 antes de 05/10).
 *
 * Todas as opções retornadas são sempre futuras e clicáveis — nunca
 * exibimos opção desabilitada.
 */

// Limite máximo (em dias) entre a data da matrícula e o vencimento da
// primeira parcela. Centralizado aqui — nunca duplicar esse número em
// outro ponto do código.
export const LIMITE_DIAS_PRIMEIRA_PARCELA = 45;

const MS_POR_DIA = 24 * 60 * 60 * 1000;

const MESES_EXTENSO = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

// Último dia válido de um mês (ex: 28/29 em fevereiro, 30 em abril…).
function ultimoDiaDoMes(ano, mesIndex) {
  return new Date(ano, mesIndex + 1, 0).getDate();
}

// Monta uma data local (sem UTC) para `dia` dentro de `mesIndex`/`ano`,
// ajustando para o último dia do mês quando `dia` não existir nele
// (ex: dia 30 em fevereiro vira 28/29).
function criarData(ano, mesIndex, dia) {
  const diaAjustado = Math.min(dia, ultimoDiaDoMes(ano, mesIndex));
  return new Date(ano, mesIndex, diaAjustado);
}

// Remove o horário, mantendo apenas ano/mês/dia local — evita que
// diferenças de horário (ou fuso) desloquem o cálculo de dias.
function apenasData(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function diferencaEmDias(inicio, fim) {
  return Math.round((apenasData(fim) - apenasData(inicio)) / MS_POR_DIA);
}

/**
 * Formata uma data local como string ISO YYYY-MM-DD (sem conversão UTC).
 */
export function formatarDataISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Formata uma data local por extenso e de forma curta, ex: "25 de julho".
 */
export function formatarDataExtenso(date) {
  return `${date.getDate()} de ${MESES_EXTENSO[date.getMonth()]}`;
}

/**
 * Resolve as opções de dia de vencimento a partir da data da matrícula e
 * da lista mestre de dias candidatos. Para cada dia, escolhe a ocorrência
 * mensal mais distante que ainda caiba no limite de dias (podendo pular
 * para M+2 ou além) — nunca no mês atual.
 *
 * @param {Date} dataMatricula
 * @param {number[]} diasMestre
 * @returns {Array<{ diaEscolhido: number, dataFinal: Date, diasAteVencimento: number }>}
 *   ordenado por diasAteVencimento crescente (data mais próxima primeiro).
 */
export function resolverOpcoesVencimento(dataMatricula, diasMestre) {
  const base = apenasData(dataMatricula);
  const opcoes = [];

  for (const dia of diasMestre) {
    let melhor = null;

    // Percorre as ocorrências mensais do dia a partir de M+1 (começar em
    // M+1 garante que a data é sempre futura). Como cada mês seguinte
    // afasta mais a data, paramos no primeiro que estourar o limite e
    // ficamos com o último que ainda cabia — a ocorrência mais distante
    // dentro do prazo. O limite de iterações é só trava de segurança:
    // com o limite em dias, nunca passamos de ~2 meses à frente.
    for (let m = 1; m <= 6; m++) {
      const mesAlvo = (base.getMonth() + m) % 12;
      const anoAlvo = base.getFullYear() + Math.floor((base.getMonth() + m) / 12);
      const dataAlvo = criarData(anoAlvo, mesAlvo, dia);
      const diasAteVencimento = diferencaEmDias(base, dataAlvo);

      if (diasAteVencimento > LIMITE_DIAS_PRIMEIRA_PARCELA) break;
      melhor = { diaEscolhido: dia, dataFinal: dataAlvo, diasAteVencimento };
    }

    // Se nem a ocorrência de M+1 coube no limite, o dia não é oferecido.
    if (melhor) opcoes.push(melhor);
  }

  // Ordena por proximidade (data mais próxima primeiro), independente do
  // número do dia — evita que o aluno leia a ordem como sequência de meses.
  return opcoes.sort((a, b) => a.diasAteVencimento - b.diasAteVencimento);
}
