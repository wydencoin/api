import { createClient } from "@supabase/supabase-js";
import { decodeBytes32String } from "ethers";
import { loadConfig } from "./config.js";
import { conectar } from "./blockchain/wydencoin.js";

// Copia os eventos do contrato para a tabela eventos_blockchain (extrato e dashboard leem de lá).
const cfg = loadConfig();
const supabase = createClient(cfg.SUPABASE_URL, cfg.SUPABASE_SERVICE_ROLE_KEY);
const { token } = conectar(cfg);

token.on("RewardMinted", async (aluno: string, valor: bigint, motivo: string, ev: any) => {
  const { error } = await supabase.from("eventos_blockchain").upsert({
    tx_hash: ev.log.transactionHash,
    log_index: ev.log.index,
    bloco: ev.log.blockNumber,
    contrato: cfg.WYDENCOIN_ADDRESS,
    evento: "RewardMinted",
    dados: { aluno, valor: valor.toString(), motivo: decodeBytes32String(motivo) },
  });
  if (error) console.error("falha ao gravar evento", error.message);
});
console.log("Indexador ouvindo RewardMinted…");
// TODO (sprint 2): reprocessar blocos perdidos desde o último bloco gravado ao reiniciar.
