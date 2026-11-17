/* Black EdukaEAD · comportamento da land (vanilla JS, sem dependências).
   Usa #form-lead, #form-ok, #form-erro, [data-oferta], [data-wa] e [data-track]. */
(function () {
  'use strict';

  /* ===== CONFIGURAÇÃO (único lugar a editar) ===== */
  var CONFIG = {
    // WhatsApp oficial do EdukaEAD, só dígitos com DDI+DDD.
    WHATSAPP: '551151925444',
    // Webhook do n8n (workflow EDUKA_BLACK_LEAD): avisa a equipe por e-mail a cada lead.
    ENDPOINT_LEADS: 'https://api.attiwork.com/webhook/eduka-black-lead',
    // Marca/site de origem (o mesmo webhook serve as cópias da land).
    MARCA: window.BLACK_MARCA || 'eduka',
    MSG_WHATSAPP: 'Quero a oferta Black Eduka'
  };

  var dl = (window.dataLayer = window.dataLayer || []);
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function radar(nome, dados) { try { if (window.umami && window.umami.track) window.umami.track(nome, dados); } catch (e) {} }

  /* ----- UTMs e gclid: capturados da URL e guardados na sessão ----- */
  var CHAVES = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
  function lerAtribuicao() {
    var q = new URLSearchParams(location.search), salvo = {};
    try { salvo = JSON.parse(sessionStorage.getItem('black_attr') || '{}'); } catch (e) {}
    CHAVES.forEach(function (k) { if (q.get(k)) salvo[k] = q.get(k); });
    try { sessionStorage.setItem('black_attr', JSON.stringify(salvo)); } catch (e) {}
    return salvo;
  }
  var attr = lerAtribuicao();

  /* ----- Links de WhatsApp: monta wa.me com a oferta escolhida ----- */
  function linkWhats(oferta) {
    var txt = CONFIG.MSG_WHATSAPP + (oferta ? ' (' + oferta + ')' : '');
    return 'https://wa.me/' + CONFIG.WHATSAPP + '?text=' + encodeURIComponent(txt);
  }
  function atualizarLinksWhats(oferta) {
    $$('[data-wa]').forEach(function (a) { a.href = linkWhats(oferta); a.target = '_blank'; a.rel = 'noopener'; });
  }
  atualizarLinksWhats('');

  /* ----- Rastreamento: todo [data-track] vira evento no dataLayer (GTM/GA4/Meta) e no Radar ----- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-track]');
    if (el) { dl.push({ event: 'cta_click', cta: el.getAttribute('data-track') }); radar('cta_click', { cta: el.getAttribute('data-track') }); }
  });

  /* ----- Formulário ----- */
  var form = $('#form-lead');
  if (!form) return;
  var ok = $('#form-ok'), erroGeral = $('#form-erro'), libera = $('#libera');
  var botao = $('button[type="submit"]', form);
  var campoOferta = $('input[name="oferta"]', form);

  // Chips de oferta: seleção única, com aria-pressed
  $$('[data-oferta]', form).forEach(function (chip) {
    chip.addEventListener('click', function () {
      $$('[data-oferta]', form).forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('on', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      campoOferta.value = chip.getAttribute('data-oferta');
      dl.push({ event: 'oferta_selecionada', oferta: campoOferta.value });
    });
  });
  // Os cartões de Guardas e Docentes pré-selecionam o chip correspondente
  var MAPA = { cta_guardas: 'Guardas', cta_docentes: 'Carreira docente' };
  $$('[data-track="cta_guardas"],[data-track="cta_docentes"]').forEach(function (a) {
    a.addEventListener('click', function () {
      var alvo = MAPA[a.getAttribute('data-track')];
      var chip = $$('[data-oferta]', form).filter(function (c) { return c.getAttribute('data-oferta') === alvo; })[0];
      if (chip) chip.click();
    });
  });

  // Máscara de telefone BR
  var tel = $('input[name="whatsapp"]', form);
  tel.addEventListener('input', function () {
    var d = tel.value.replace(/\D/g, '').slice(0, 11), m = d;
    if (d.length > 10) m = '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
    else if (d.length > 6) m = '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    else if (d.length > 2) m = '(' + d.slice(0, 2) + ') ' + d.slice(2);
    tel.value = m;
  });

  var regras = {
    nome: function (v) { return v.trim().split(/\s+/).length >= 2 && v.trim().length >= 5; },
    whatsapp: function (v) { var d = v.replace(/\D/g, ''); return (d.length === 11 && d[2] === '9') || d.length === 10; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }
  };
  function validar(input) {
    var valido = regras[input.name](input.value);
    var msg = $('.err', input.parentNode);
    input.setAttribute('aria-invalid', valido ? 'false' : 'true');
    if (msg) msg.hidden = valido;
    return valido;
  }
  Object.keys(regras).forEach(function (n) {
    var input = $('[name="' + n + '"]', form);
    input.addEventListener('blur', function () { if (input.value) validar(input); });
    input.addEventListener('input', function () { if (input.getAttribute('aria-invalid') === 'true') validar(input); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    erroGeral.hidden = true;
    var campos = Object.keys(regras).map(function (n) { return $('[name="' + n + '"]', form); });
    var invalidos = campos.filter(function (c) { return !validar(c); });
    if (invalidos.length) { invalidos[0].focus(); return; }

    var payload = {
      nome: campos[0].value.trim(),
      whatsapp: '55' + campos[1].value.replace(/\D/g, ''),
      email: campos[2].value.trim().toLowerCase(),
      oferta: campoOferta.value,
      marca: CONFIG.MARCA,
      pagina: location.pathname,
      enviado_em: new Date().toISOString()
    };
    CHAVES.forEach(function (k) { if (attr[k]) payload[k] = attr[k]; });

    botao.disabled = true;
    fetch(CONFIG.ENDPOINT_LEADS, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); })
      .then(function () {
        dl.push({ event: 'generate_lead', oferta: payload.oferta });
        radar('generate_lead', { oferta: payload.oferta });
        atualizarLinksWhats(payload.oferta);
        form.hidden = true; if (libera) libera.hidden = true;
        ok.hidden = false;
        ok.focus();
      }).catch(function () {
        erroGeral.hidden = false;
        botao.disabled = false;
      });
  });
})();
