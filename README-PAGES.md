# Guia rapido - paginas em Markdown via /info

Este arquivo fica na raiz do projeto para orientar publicacao sem expor este guia publicamente.

## Como publicar uma pagina nova

1. Crie um arquivo `.md` e envie via FTP para:
   - `public/pages/`
2. Nomeie o arquivo com slug amigavel, por exemplo:
   - `campanha-inverno-2026.md`
3. A URL sera:
   - `/info/campanha-inverno-2026`

## Exemplo real ja publicado

- Arquivo: `public/pages/regras-torcidaeduka.md`
- URL: `/info/regras-torcidaeduka`

## Boas praticas de conteudo

- Use titulos com `#`, `##`, `###`
- Use listas com `-` ou numeradas
- Use `---` para divisores entre secoes
- Evite HTML inline; prefira Markdown puro

## Observacoes tecnicas

- Nao precisa rebuild para novos arquivos em `public/pages`
- O servidor precisa manter fallback SPA para abrir `/info/...` diretamente
