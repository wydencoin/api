import { Router } from "express";
import { z } from "zod";

// Corpo enviado pelo motor depois que o admin aprova o ciclo.
export const corpoEmissoes = z.object({
  ciclo: z.string().min(1),
  emissoes: z.array(z.object({
    matricula: z.string().min(1),
    regra: z.string().regex(/^[A-Z0-9_]{2,31}$/),
    valor: z.number().int().positive(),
  })).min(1),
});

export function rotasInternas(): Router {
  const r = Router();
  r.post("/emissoes", (req, res) => {
    const corpo = corpoEmissoes.safeParse(req.body);
    if (!corpo.success) return res.status(400).json({ erro: corpo.error.flatten() });
    // TODO (sprint 2): gravar em `emissoes` (status calculada), buscar carteiras,
    // chamar emitirEmLotes e atualizar status/tx_hash. A unique (matricula, regra, ciclo) evita pagar duas vezes.
    res.status(501).json({ erro: "não implementado", recebidas: corpo.data.emissoes.length });
  });
  return r;
}
