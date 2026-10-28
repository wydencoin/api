# api — WydenCoin

Back-end em Node.js 22 + TypeScript + Express. Responsáveis: **Ericka** (API, autenticação, segurança, testes) e **Carlos** (módulo `src/blockchain`).

## Estrutura
| Caminho | O que faz |
| --- | --- |
| `src/app.ts` | Rotas e middlewares |
| `src/middleware/auth.ts` | Valida o login do Supabase e o token interno do motor |
| `src/routes/` | Rotas do aluno, admin e internas |
| `src/blockchain/` | Conexão com o contrato; emissão em lotes de 100 |
| `src/indexer.ts` | Copia os eventos do contrato para `eventos_blockchain` |
| `openapi.yaml` | Contrato da API (abra em editor.swagger.io) |

## Rodar
```bash
cp .env.example .env      # preencha
npm ci
npm run dev               # API em http://localhost:3000
npm run indexer           # em outro terminal
npm test
```
Em desenvolvimento, use `npx hardhat node` (repo **contracts**) como blockchain local.

**Só esta API guarda a chave de emissão.** O motor envia as emissões aprovadas para `POST /internal/emissoes`.
