/**
 * Endpoints do n8n.
 *
 * O host saiu de `workflow.arelis.online` (desligado — as chamadas passaram a
 * dar ERR_CONNECTION_TIMED_OUT e os formulários morriam no navegador) para os
 * domínios da attiwork, que têm papéis distintos:
 *
 *   api.attiwork.com      → entrada de máquina, é o webhook de produção
 *   workflow.attiwork.com → painel do n8n, e é ele que serve o /webhook-test
 *
 * Fica em um arquivo só porque, quando o host mudou, a URL estava duplicada em
 * cada página que envia formulário — e a correção virou caça ao endereço com o
 * site fora do ar.
 */
const N8N_PROD = 'https://api.attiwork.com';
const N8N_TEST = 'https://workflow.attiwork.com';

/** Monta a URL do webhook conforme o ambiente do build. */
export function webhookN8n(caminho) {
  return import.meta.env.DEV
    ? `${N8N_TEST}/webhook-test/${caminho}`
    : `${N8N_PROD}/webhook/${caminho}`;
}
