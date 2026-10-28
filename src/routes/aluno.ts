import { Router } from "express";

// Rotas do Portal do Aluno — ver openapi.yaml. Cada TODO vira uma issue.
export function rotasAluno(): Router {
  const r = Router();
  r.get("/me/saldo", (_req, res) => res.status(501).json({ erro: "TODO: saldo disponível e reservado" }));
  r.get("/me/extrato", (_req, res) => res.status(501).json({ erro: "TODO: emissões e resgates com motivo" }));
  r.post("/me/carteira", (_req, res) => res.status(501).json({ erro: "TODO: criar carteira custodial no 1º login" }));
  return r;
}
