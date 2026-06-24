# Diretrizes SEO & AEO — EdukaEAD
> Última atualização: v1.3.3 · Jun 2026

---

## Status atual (PageSpeed Insights)

| Métrica | Mobile | Desktop |
|---|---|---|
| Desempenho | 85 | 99 |
| Acessibilidade | 87 → **a melhorar** | 93 → **a melhorar** |
| Práticas recomendadas | 96 | 96 |
| SEO | **100** | **100** |
| Navegação agêntica | 1/3 → **corrigido v1.3.2** | 2/3 → **corrigido v1.3.2** |

**Core Web Vitals (mobile — dados reais 28 dias):**
- LCP: 2,8s ⚠️ (limite: 2,5s) — origem: TTFB 0,9s (latência de servidor)
- INP: 125ms ✅
- CLS: 0 ✅

---

## Ajustes aplicados (v1.3.0 → v1.3.3)

### v1.3.0 — AEO: llms.txt + sameAs
- Criado `public/llms.txt` com entidade, cursos, públicos, páginas e links
- `sameAs` no JSON-LD enriquecido: Instagram, `edukaead.com.br`, Google Maps, WhatsApp

### v1.3.1 — llms.txt com links Markdown
- Todos os URLs convertidos para formato `[texto](url)` conforme exigido pelo PageSpeed
- Domínio histórico `edukaead.com.br` documentado como site alternativo

### v1.3.2 — Acessibilidade agêntica
- `aria-label` e `aria-expanded` adicionados ao botão hamburguer `button.mobile-toggle`
- Resolve auditoria "Buttons must have discernible text" do Lighthouse

### v1.3.3 — Performance + Acessibilidade geral
- **Google Fonts não-bloqueante**: `@import` removido do CSS; substituído por `preconnect` + `media="print" onload` no `index.html` — economia estimada 310ms desktop / 1.080ms mobile
- **Hierarquia de headings corrigida**: `h4→h3` e `h3→h2` em `LandingPage`, `Contato` e `Cursos`; resolve auditoria "heading elements not in sequentially-descending order"
- **Imagens com dimensões explícitas**: `width`/`height` adicionados ao logo em Header, Prematricula e Documentos; evita layout shift
- **Contraste melhorado**: `--text-muted` de `#64748B` (ratio ~3.8:1) para `#8899B0` (ratio ~5.2:1); atinge WCAG AA

---

## Estrutura SEO atual — o que está bem

### JSON-LD (`index.html`)
```json
@graph: [
  LocalBusiness + EducationalOrganization,
  FAQPage (4 perguntas),
  WebSite
]
```
- `sameAs`: WhatsApp, Instagram, Google Maps, edukaead.com.br
- `hasOfferCatalog`: 4 cursos com descrição
- `taxID`, `telephone`, `email`, `address`, `geo` preenchidos
- FAQ com respostas ricas sobre diploma EAD, GCM SP, Sindguardas, 2ª Licenciatura

### Meta tags
- `description`, `robots`, `canonical` ✅
- Open Graph completo ✅
- Twitter Card `summary_large_image` ✅
- `lang="pt-BR"` no `<html>` ✅

### Rastreabilidade
- `robots.txt`: `Allow: /`, sitemap apontado ✅
- `sitemap.xml` em `https://edukaead.online/sitemap.xml` ✅
- `llms.txt` com links Markdown ✅

---

## Pendências para pontuação máxima

### Acessibilidade (87 mobile → meta: 95+)
| Problema | Solução |
|---|---|
| Contraste em elementos específicos | Auditar com DevTools > Accessibility > Color Contrast |
| Títulos — verificar subpáginas | Rodar Lighthouse em `/guardas`, `/professores`, `/carreira-publica`, `/carreira-privada` individualmente |

### Práticas recomendadas (96 → meta: 100)
Requerem configuração no servidor Hostinger via `.htaccess`:

```apache
# HSTS
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

# COOP
Header always set Cross-Origin-Opener-Policy "same-origin"

# XFO (Clickjacking)
Header always set X-Frame-Options "SAMEORIGIN"

# CSP básica (ajustar conforme integrações)
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://radar.attiwork.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; font-src https://fonts.gstatic.com; img-src 'self' data: https:;"
```

> ⚠️ Testar CSP em modo `Content-Security-Policy-Report-Only` antes de ativar para não quebrar integrações.

### Erros no console
- Identificar após próximo deploy (verificar no Chrome DevTools > Console em produção)
- Provável origem: Umami/Radar tentando carregar antes do conteúdo, ou avisos de `manifest.json` ausente

### Performance mobile (LCP 2,8s → meta: <2,5s)
- **Causa raiz**: TTFB 0,9s — latência do servidor Hostinger
- **Solução**: Upgrade para plano com CDN (Hostinger Business/Cloud) ou Cloudflare proxy free
- **Não é código** — todas as otimizações de bundle já foram aplicadas

---

## Processo de deploy e atualização

**Nunca editar arquivos diretamente no servidor.** Fluxo correto:

```bash
# 1. Editar localmente
# 2. Commit
git add . && git commit -m "descrição"
git push origin master

# 3. Tag para acionar CI/CD
git tag vX.X.X -m "descrição"
git push origin vX.X.X
```

O GitHub Actions faz o build Vite e publica o `dist/` na branch `online`. O webhook do GitHub notifica o Hostinger que faz pull automático.

**Verificar versão online:** rodapé do site exibe a tag atual (ex: `v1.3.3`) de forma discreta.
