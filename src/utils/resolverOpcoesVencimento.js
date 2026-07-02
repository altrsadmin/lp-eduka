/**
 * Regra de negócio: resolução das opções de dia de vencimento oferecidas
 * na etapa Comercial da ficha de matrícula.
 *
 * Resumo da regra (ver histórico do time comercial):
 * 1. Existe uma lista mestre de dias candidatos (ex: 5, 10, 15, 20, 25).
 * 2. Para cada dia, calculamos a data de vencimento no mês SEGUINTE (M+1)
 *    à data da matrícula.
 * 3. Se essa data em M+1 ultrapassar o limite de dias definido em
 *    LIMITE_DIAS_PRIMEIRA_PARCELA, a opção não pode ser oferecida em M+1.
 * 4. Os dias que "estouraram" o limite não somem: entre todos eles,
 *    calculamos a versão de cada um no mês ATUAL (M0) e escolhemos apenas
 *    UM — o que resultar na data mais distante (maior nº de dias até o
 *    vencimento) ainda dentro do M0 e ainda no futuro. Esse é o fallback.
 * 5. Resultado final = opções válidas em M+1 + no máximo 1 opção fallback
 *    em M0, ordenadas pela proximidade (data mais próxima primeiro).
 *
 * Nenhuma opção fica desabilitada — o que não cabe em M+1 é substituído,
 * como conjunto, por uma única alternativa no mês atual.
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
 * da lista mestre de dias candidatos.
 *
 * @param {Date} dataMatricula
 * @param {number[]} diasMestre
 * @returns {Array<{ diaEscolhido: number, dataFinal: Date, diasAteVencimento: number, origem: 'M+1' | 'M0_fallback' }>}
 *   ordenado por diasAteVencimento crescente (data mais próxima primeiro).
 */
export function resolverOpcoesVencimento(dataMatricula, diasMestre) {
  const base = apenasData(dataMatricula);

  // Mês seguinte (M+1) à data da matrícula, com virada de ano em dezembro.
  const mesM1 = (base.getMonth() + 1) % 12;
  const anoM1 = base.getMonth() === 11 ? base.getFullYear() + 1 : base.getFullYear();

  const opcoes = [];
  const diasEstourados = [];

  // Regra 2/3: para cada dia mestre, calcula a data em M+1 e verifica se
  // respeita o limite de dias da primeira parcela.
  for (const dia of diasMestre) {
    const dataM1 = criarData(anoM1, mesM1, dia);
    const diasAteVencimento = diferencaEmDias(base, dataM1);

    if (diasAteVencimento <= LIMITE_DIAS_PRIMEIRA_PARCELA) {
      opcoes.push({ diaEscolhido: dia, dataFinal: dataM1, diasAteVencimento, origem: 'M+1' });
    } else {
      diasEstourados.push(dia);
    }
  }

  // Regra 4 (fallback M0): dos dias que estouraram o limite em M+1, escolhe
  // apenas UM — o que, calculado no mês atual (M0), resulta na data mais
  // distante (maior número de dias até o vencimento) e ainda está no
  // futuro. Isso evita oferecer múltiplas opções "extras" e concentra o
  // que sobrou em uma única alternativa de bom senso comercial.
  if (diasEstourados.length) {
    let melhorFallback = null;

    for (const dia of diasEstourados) {
      const dataM0 = criarData(base.getFullYear(), base.getMonth(), dia);
      const diasAteVencimento = diferencaEmDias(base, dataM0);

      // Datas do mês atual que já passaram não são oferecidas.
      if (diasAteVencimento <= 0) continue;

      if (!melhorFallback || diasAteVencimento > melhorFallback.diasAteVencimento) {
        melhorFallback = { diaEscolhido: dia, dataFinal: dataM0, diasAteVencimento, origem: 'M0_fallback' };
      }
    }

    if (melhorFallback) opcoes.push(melhorFallback);
  }

  // Regra final: ordena por proximidade (data mais próxima primeiro),
  // independente do número do dia — evita que o aluno leia a ordem como
  // sequência de meses.
  return opcoes.sort((a, b) => a.diasAteVencimento - b.diasAteVencimento);
}
