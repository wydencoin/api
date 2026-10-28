import { loadConfig } from "./config.js";
import { criarApp } from "./app.js";

const cfg = loadConfig();
criarApp(cfg).listen(cfg.PORT, () => console.log(`API WydenCoin na porta ${cfg.PORT}`));
