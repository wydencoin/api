import type { NextFunction, Request, Response } from "express";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Valida o token do Supabase Auth enviado pelo portal (Authorization: Bearer <jwt>). */
export const exigirLogin = (supabase: SupabaseClient) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace(/^Bearer /, "");
    if (!token) return res.status(401).json({ erro: "login necessário" });
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) return res.status(401).json({ erro: "sessão inválida" });
    res.locals.usuarioId = data.user.id;
    next();
  };

/** Protege as rotas /internal/* usadas pelo motor. */
export const exigirTokenInterno = (tokenEsperado: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization !== `Bearer ${tokenEsperado}`) return res.status(403).json({ erro: "proibido" });
    next();
  };
