# Plano de Tracking — lp-eduka × radar/attiwork

> Documento gerado automaticamente. Descreve todos os eventos a implementar no site `edukaead.online` para instrumentação completa com o radar.

**Website ID radar:** `7eedf545-b06a-4230-8e17-e78a49751975`  
**Script instalado em:** `index.html` (já presente)  
**Referência:** `radar-aw/docs/RADAR-SKILL.md`

---

## Status atual

| Item | Status |
|---|---|
| Script tag instalado | ✅ |
| Website cadastrado no radar | ✅ |
| Pageviews automáticos | ✅ |
| `useTracking` hook | ❌ pendente |
| Eventos de CTA | ❌ pendente |
| `radarId` nas URLs de saída | ❌ pendente |
| Identificação de usuário | ❌ pendente (form inativo) |

---

## Arquivo: `src/hooks/useTracking.js` — CRIAR

```js
export function useTracking() {
  const track = (event, data) => window.umami?.track(event, data);
  const identify = (data) => window.umami?.identify(data);
  return { track, identify };
}

export function getRadarId() {
  const sessionCache = window.umami?.getSession()?.cache;
  if (sessionCache) return sessionCache;
  const key = 'radar.vid';
  let id = localStorage.getItem(key);
  if (!id) {
    id = (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36));
    localStorage.setItem(key, id);
  }
  return id;
}
```

---

## Eventos por arquivo

### `src/components/LandingPage.jsx`

#### Hero CTA (linha ~127) — `scrollToFinalCta`
```jsx
// ANTES
const scrollToFinalCta = (e) => {
  e.preventDefault();
  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// DEPOIS
const { track } = useTracking();
const scrollToFinalCta = (e) => {
  e.preventDefault();
  track('scroll-to-contato', { pagina: content.slug || 'home', origem: 'hero-cta' });
  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
```

#### Cards de audiência com WhatsApp (`card.waLink`) (linha ~205)
```jsx
// ANTES
<a key={idx} href={card.waLink} target="_blank" rel="noopener noreferrer" className="audience-card scroll-animate">

// DEPOIS
<a
  key={idx}
  href={`${card.waLink}&radarId=${getRadarId()}`}
  target="_blank"
  rel="noopener noreferrer"
  className="audience-card scroll-animate"
  onClick={() => track('click-whatsapp', { area: card.title, secao: 'audiencias' })}
>
```

#### CTA Primeira Graduação (`content.waLink`) (linha ~234)
```jsx
// ANTES
<a href={content.waLink} target="_blank" rel="noopener noreferrer" ...>

// DEPOIS
<a
  href={`${content.waLink}&radarId=${getRadarId()}`}
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => track('click-whatsapp', { area: content.slug || 'home', secao: 'primeira-graduacao' })}
  ...
>
```

#### CTAs `href="#contato"` nas demais seções
Adicionar em cada um:
```jsx
onClick={() => track('scroll-to-contato', { pagina: content.slug || 'home', origem: 'secao-X' })}
```

---

### `src/components/Footer.jsx`

#### WhatsApp oficial (linha ~43)
```jsx
// ANTES
<a href={FOOTER_CONTACT.whatsapp.href} target="_blank" ...>

// DEPOIS
<a
  href={`${FOOTER_CONTACT.whatsapp.href}&radarId=${getRadarId()}`}
  target="_blank"
  rel="noopener noreferrer"
  data-umami-event="click-whatsapp"
  data-umami-event-secao="footer"
  className="footer-contact-link"
>
```

> Nota: `getRadarId()` no atributo `href` JSX é avaliado no render. Para garantir que o valor é o mais atual, usar `onClick` + referência dinâmica se necessário.

#### Email (linha ~53)
```jsx
<a
  href={`mailto:${FOOTER_CONTACT.email}`}
  data-umami-event="click-email"
  data-umami-event-secao="footer"
  className="footer-contact-link"
>
```

#### Instagram (linha ~59)
```jsx
<a
  href={FOOTER_CONTACT.instagram.href}
  target="_blank"
  rel="noopener noreferrer"
  data-umami-event="click-instagram"
  data-umami-event-secao="footer"
  className="footer-contact-link"
>
```

---

### `src/pages/Contato.jsx`

#### WhatsApp Contato (linha ~46)
```jsx
// ANTES
<a href="https://wa.me/5511978683774" target="_blank" ...>

// DEPOIS
<a
  href={`https://wa.me/5511978683774?radarId=${getRadarId()}`}
  target="_blank"
  rel="noopener noreferrer"
  data-umami-event="click-whatsapp"
  data-umami-event-secao="pagina-contato"
  className="btn btn-primary"
>
```

#### Formulário (linha ~55) — instrumentar mesmo sem backend ativo
```jsx
// O form não tem backend — só trackear o intent
<form
  onSubmit={(e) => {
    e.preventDefault();
    const email = e.target.querySelector('[type="email"]')?.value;
    const nome = e.target.querySelector('[type="text"]')?.value;
    window.umami?.track('submit-form', { tipo: 'contato' });
    if (email) window.umami?.identify({ email, nome });
  }}
>
```

---

## Funil de conversão — configurar no radar

Após implementação, criar o funil:

**Funil: Home → WhatsApp (conversão direta)**
1. URL = `/`
2. Event = `scroll-to-contato`
3. Event = `click-whatsapp`

**Funil: Área de interesse → Conversão**
1. URL = `/guardas` (ou `/professores`, etc.)
2. Event = `click-whatsapp` com `area = "Guardas Municipais"`

---

## Estimativa de implementação

| Tarefa | Tempo |
|---|---|
| Criar `useTracking.js` | 15min |
| Instrumentar `LandingPage.jsx` | 1h |
| Instrumentar `Footer.jsx` | 20min |
| Instrumentar `Contato.jsx` | 20min |
| Testar eventos no painel radar | 30min |
| **Total** | **~2h** |
