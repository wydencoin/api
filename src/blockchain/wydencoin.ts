import { Contract, JsonRpcProvider, Wallet } from "ethers";
import type { Config } from "../config.js";
import { dividirEmLotes, paraArgumentos, type Emissao } from "./lotes.js";

// Trecho da ABI usado pela API. Atualize quando o contrato mudar (repo contracts).
export const WYDENCOIN_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function mintRewardBatch(address[] alunos, uint256[] valores, bytes32[] motivos)",
  "event RewardMinted(address indexed aluno, uint256 valor, bytes32 motivo)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
];

export function conectar(cfg: Config) {
  const provider = new JsonRpcProvider(cfg.RPC_URL);
  const minter = new Wallet(cfg.MINTER_PRIVATE_KEY, provider);
  const token = new Contract(cfg.WYDENCOIN_ADDRESS, WYDENCOIN_ABI, minter);
  return { provider, token };
}

/** Emite em lotes de até 100. Retorna os hashes das transações, na ordem. */
export async function emitirEmLotes(token: Contract, emissoes: Emissao[]): Promise<string[]> {
  const hashes: string[] = [];
  for (const lote of dividirEmLotes(emissoes)) {
    const tx = await token.mintRewardBatch(...paraArgumentos(lote));
    const rc = await tx.wait();
    hashes.push(rc.hash);
  }
  return hashes;
}
