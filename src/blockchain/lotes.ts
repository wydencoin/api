import { encodeBytes32String } from "ethers";

export type Emissao = { endereco: string; valor: number; motivo: string };

/** Lote de 100 alunos usou ~2,8 milhões de gas no teste do contrato; fique nesse tamanho. */
export const TAMANHO_LOTE = 100;

export function dividirEmLotes<T>(itens: T[], tamanho = TAMANHO_LOTE): T[][] {
  if (tamanho < 1) throw new Error("tamanho do lote deve ser >= 1");
  const lotes: T[][] = [];
  for (let i = 0; i < itens.length; i += tamanho) lotes.push(itens.slice(i, i + tamanho));
  return lotes;
}

/** Converte um lote para os três arrays que mintRewardBatch espera. */
export function paraArgumentos(lote: Emissao[]): [string[], bigint[], string[]] {
  return [
    lote.map((e) => e.endereco),
    lote.map((e) => BigInt(e.valor)),
    lote.map((e) => encodeBytes32String(e.motivo)), // ex.: "SIA_15D" -> bytes32 legível
  ];
}
