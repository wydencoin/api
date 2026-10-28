import express from "express";
import { createClient } from "@supabase/supabase-js";
import type { Config } from "./config.js";
import { exigirLogin, exigirTokenInterno } from "./middleware/auth.js";
import { rotasAluno } from "./routes/aluno.js";
import { rotasInternas } from "./routes/internal.js";

export function criarApp(cfg: Config) {
  const app = express();
  app.use(express.json({ limit: "2mb" }));
  const supabase = createClient(cfg.SUPABASE_URL, cfg.SUPABASE_SERVICE_ROLE_KEY);

  app.get("/health", (_req, res) => res.json({ ok: true }));
  app.use("/alunos", exigirLogin(supabase), rotasAluno());
  app.get("/beneficios", (_req, res) => res.status(501).json({ erro: "TODO: catálogo" }));
  app.use("/internal", exigirTokenInterno(cfg.INTERNAL_API_TOKEN), rotasInternas());
  return app;
}
