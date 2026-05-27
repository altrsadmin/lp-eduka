# Mapa de Imagens — Eduka EAD LP

> Guia de referência para geração e integração das imagens do projeto.
> Atualizado em: 2026-03-10

---

## Visão Geral

O projeto tem **2 pontos de ativação de imagem** implementados no código:

| Ponto | Onde aparece | Como ativa | Quando usar |
|-------|-------------|------------|-------------|
| **A — Hero Frame** | Coluna direita do hero, aspecto 4:3, com borda glass | `themes.js → hero.image` | Foto de pessoa / contexto da página |
| **B — Section BG** | Fundo da seção "Autoridade" (niche), full-width | `niche.bgImage` → `style={{ '--section-bg': "url(...)" }}` na `<section>` | Foto urbana / ambiente SP |

---

## Mapa de Slots — Arquivos Reais

### Ponto A — Hero Frame (4:3)

Frame com borda glassmorphism, overlay diagonal leve, cantos arredondados (`border-radius: 24px`).
Fallback: quando `hero.image` não está definido, exibe os stat cards de métricas.

| Slot | Página | Arquivo em `public/` | Chave em `themes.js` | Status |
|------|--------|--------------------|----------------------|--------|
| **A1** | `/` Home | `eduka-ead-alunos-ensino-superior-sao-paulo.png` | `global.hero.image` | ✅ Conectado |
| **A2** | `/guardas` | `eduka-ead-guarda-civil-municipal-gcm-sp.png` | `guardas.hero.image` | ✅ Conectado |
| **A3** | `/professores` | `eduka-ead-professores-rede-publica-sp.png` | `professores.hero.image` | ✅ Conectado |
| **A4** | `/carreira-publica` | `eduka-ead-profissionais-carreira-publica-sp.png` | `publica.hero.image` | ✅ Conectado |

**Alternativas disponíveis (não conectadas):**
- A1 alt: `eduka-ead-profissionais-graduacao-sao-paulo.png` — grupo de profissionais
- A2 alt: `eduka-ead-guardas-municipais-sp-dupla.png` — dupla GCM (M+F)

**Dimensão mínima:** 640×480px
**Dimensão ideal (retina):** 1280×960px
**Formato:** JPG/PNG, qualidade 85+, comprimido com squoosh.app ou TinyPNG

---

### Ponto B — Background de Seção (16:9)

Overlay escuro automático aplicado via `.bg-image-overlay::before` (gradiente 91%→72%→85% opacidade).
A seção niche já tem a classe `bg-image-overlay` e passa `--section-bg` dinamicamente via `style`.

| Slot | Página | Arquivo em `public/` | Como ativa | Status |
|------|--------|--------------------|-----------|--------|
| **B1** | `/` Home (seção Autoridade) | `sao-paulo-centro-viaduto-cha-dia.png` | `global.niche.bgImage` | ✅ Conectado |
| **B2** | Demais páginas | — | Não há `bgImage` nos outros temas | ⬜ Opcional |

**Arquivo alternativo (não conectado):** `sao-paulo-centro-anhangabau-noite.png` — versão noturna, mais escura.

**Dimensão mínima:** 1280×720px
**Dimensão ideal (retina):** 1920×1080px
**Formato:** JPG/PNG, qualidade 80, máximo 400KB após compressão

---

## Como Integrar Novas Imagens

### Slot A (Hero) — passo a passo

1. Salve a imagem em `public/` com nome SEO-friendly (ex: `eduka-ead-hero-[pagina]-sp.png`)
2. Adicione a chave no `src/data/themes.js`:

```js
// Exemplo para /guardas
guardas: {
  hero: {
    image: '/eduka-ead-guarda-civil-municipal-gcm-sp.png',  // ← caminho relativo a public/
    tag: 'Acelere sua Carreira na Guarda',
    // ... resto igual
  }
}
```

3. O `LandingPage.jsx` detecta `content.hero.image` automaticamente e renderiza o frame.

---

### Slot B (Section BG) — passo a passo

1. Salve a imagem em `public/` com nome SEO-friendly
2. Adicione `bgImage` ao objeto `niche` em `themes.js`:

```js
// Exemplo para home
global: {
  niche: {
    bgImage: '/sao-paulo-centro-viaduto-cha-dia.png',  // ← adicionar esta linha
    tag: 'Polo no Centro de SP',
    // ... resto igual
  }
}
```

3. O `LandingPage.jsx` já passa o `style` dinamicamente:

```jsx
<section
  id="autoridade"
  className="fluid-section niche-section bg-image-overlay"
  style={content.niche.bgImage
    ? { '--section-bg': `url('${content.niche.bgImage}')` }
    : undefined
  }
>
```

---

## Prompts de Geração AI (refinados)

> Testados para **Midjourney v6** e **DALL-E 3**.
> No Midjourney: adicionar `--ar 4:3` (slots A) ou `--ar 16:9` (slots B) e `--style raw` ao final.
> No DALL-E: especificar "portrait 4:3 ratio" ou "wide landscape, 16:9 ratio" na instrução.

---

### A1 — Hero Home *(composição à direita — refinado)*

```
Diverse group of Brazilian adults in their 30s and 40s — mix of professionals and students — gathered around a table with laptops and open notebooks, positioned toward the right side of the frame, left side intentionally darker and empty to allow text overlay, modern coworking space in São Paulo, warm amber backlight contrasting with cool teal city glow through floor-to-ceiling windows at dusk, cinematic depth of field, photojournalistic realism, aspirational mood, dark moody color grading --ar 4:3 --style raw
```

---

### A2 — Hero Guardas Municipais v1 *(oficial individual)*

```
Brazilian GCM officer, dark navy uniform, late 30s, seated at a desk with open books and a glowing laptop, dramatic single-source side lighting creating deep shadows, São Paulo city architecture blurred in background through window, teal accent light on face, positioned toward the right side of the frame, left side darker and open, cinematic still photography, ultra-realistic --ar 4:3 --style raw
```

### A2 — Hero Guardas Municipais v2 *(dupla M+F, composição à direita — refinado)*

```
Brazilian GCM male and female officers in dark navy uniforms, late 30s, standing side by side in a modern institutional corridor, looking at documents together in a professional setting, positioned toward the right side of the frame, left half intentionally darker with empty space for text, dramatic directional lighting, teal and amber tones, ultra-realistic documentary photography --ar 4:3 --style raw
```

### A2 — Hero Guardas Municipais v3 *(grupo institucional, sem aspecto romântico)*

```
Three Brazilian GCM officers in dark navy uniforms inside a modern institutional building lobby, standing in a triangle formation facing slightly away from camera toward large windows with São Paulo skyline, professional posture, dramatic backlight from city below creating rim light effect on uniforms, moody teal and amber color palette, cinematic wide angle, ultra-realistic --ar 4:3 --style raw
```

---

### A3 — Hero Professores da Rede

```
Brazilian female teacher early 30s standing in a softly lit modern classroom holding a stack of books, thoughtful confident expression, warm golden hour light streaming through windows behind her, classroom blurred in bokeh, positioned toward the right side of the frame, left side darker for text overlay, documentary photography aesthetic, deep shadows, desaturated tones with warm highlights, ultra-realistic --ar 4:3 --style raw
```

---

### A4 — Hero Carreira Pública

```
Brazilian professional man and woman in business casual attire standing at a high-rise window viewed from slightly below and behind, looking at São Paulo skyline at blue hour, dramatic volumetric light from city glow below, dark interior, subjects positioned toward the right side of the frame, left side open and darker, cinematic composition, career ambition mood, ultra-realistic photography --ar 4:3 --style raw
```

---

### B1 — Background Seção Niche (Home) *(versão diurna — refinado)*

```
Bright sunny morning aerial view of São Paulo downtown Centro historic district, Viaduto do Chá and surrounding buildings bathed in warm golden hour sunlight, vibrant urban energy, blue sky with soft clouds, warm gold and teal color palette, optimistic and aspirational mood, ultra-realistic wide angle photography, 16:9 --ar 16:9 --style raw
```

**Alternativa descartada (muito escura):** versão noturna → `sao-paulo-centro-anhangabau-noite.png`

---

## Inventário de Arquivos — `public/`

| Arquivo | Slot | Tema conectado |
|---------|------|---------------|
| `eduka-ead-alunos-ensino-superior-sao-paulo.png` | A1 | `global.hero.image` ✅ |
| `eduka-ead-profissionais-graduacao-sao-paulo.png` | A1 alt | — |
| `eduka-ead-guarda-civil-municipal-gcm-sp.png` | A2 | `guardas.hero.image` ✅ |
| `eduka-ead-guardas-municipais-sp-dupla.png` | A2 alt | — |
| `eduka-ead-professores-rede-publica-sp.png` | A3 | `professores.hero.image` ✅ |
| `eduka-ead-profissionais-carreira-publica-sp.png` | A4 | `publica.hero.image` ✅ |
| `sao-paulo-centro-viaduto-cha-dia.png` | B1 | `global.niche.bgImage` ✅ |
| `sao-paulo-centro-anhangabau-noite.png` | B1 alt noturna | — |
| `eduka-ead-logo.png` | — | Logo principal |
| `eduka-ead-logo-fundo-azul.png` | — | Logo variação |
| `eduka-ead-logo-fundo-branco.png` | — | Logo variação |
| `eduka-ead-logo-fundo-preto.png` | — | Logo variação |

---

## Classes CSS de Referência

| Classe | Arquivo | Função |
|--------|---------|--------|
| `.hero-image-frame` | `LandingPage.css` | Container do hero image (4:3, glass border) |
| `.hero-image-mask` | `LandingPage.css` | Overlay diagonal sobre a hero image |
| `.bg-image-overlay` | `index.css` | Seção com bg-image + overlay escuro automático |
| `.bg-image-overlay::before` | `index.css` | O overlay em si (gradiente 91%→72%→85%) |

---

## Checklist de Produção

- [x] A1 — `eduka-ead-alunos-ensino-superior-sao-paulo.png` — conectado em `global.hero.image`
- [x] A2 — `eduka-ead-guarda-civil-municipal-gcm-sp.png` — conectado em `guardas.hero.image`
- [x] A3 — `eduka-ead-professores-rede-publica-sp.png` — conectado em `professores.hero.image`
- [x] A4 — `eduka-ead-profissionais-carreira-publica-sp.png` — conectado em `publica.hero.image`
- [x] B1 — `sao-paulo-centro-viaduto-cha-dia.png` — conectado em `global.niche.bgImage`
- [x] `themes.js` atualizado com `hero.image` por tema e `niche.bgImage` no global
- [x] `LandingPage.jsx` passa `--section-bg` dinamicamente via `style` no niche section
- [ ] Testar fallback: remover temporariamente `hero.image` e confirmar que stat cards aparecem
- [ ] Otimizar imagens (squoosh.app / TinyPNG) — prioridade: B1 deve ficar < 400KB
