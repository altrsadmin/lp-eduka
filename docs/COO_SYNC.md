## Status: Em andamento
## Visão Executiva (Briefing)
- **O que mudou:** Workflow de deploy contínuo para branch `online` foi criado (`.github/workflows/deploy-online.yml`) no padrão de tag `v*`, com build Vite (`dist/`) e geração de `VERSION`.
- **Por que mudou:** Replicar no EdukaEAD o fluxo CI/CD já validado em outros projetos, reduzindo esforço manual de publicação.
- **Risco/Desvio:** O deploy automático só ocorre em push de tags com prefixo `v` (ex.: `v1.0.0`).
- **Bloqueios:** Nenhum.
