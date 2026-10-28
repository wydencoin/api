import { describe, expect, it } from "vitest";
import { decodeBytes32String } from "ethers";
import { dividirEmLotes, paraArgumentos } from "../src/blockchain/lotes.js";
import { corpoEmissoes } from "../src/routes/internal.js";

describe("lotes de emissão", () => {
  it("divide 250 emissões em lotes de 100, 100 e 50", () => {
    const lotes = dividirEmLotes(Array.from({ length: 250 }, (_, i) => i));
    expect(lotes.map((l) => l.length)).toEqual([100, 100, 50]);
  });
  it("converte o motivo para bytes32 legível", () => {
    const [, valores, motivos] = paraArgumentos([{ endereco: "0x" + "1".repeat(40), valor: 20, motivo: "SIA_15D" }]);
    expect(valores[0]).toBe(20n);
    expect(decodeBytes32String(motivos[0])).toBe("SIA_15D");
  });
});

describe("validação do corpo de emissões", () => {
  it("recusa regra fora do padrão e valor negativo", () => {
    const r = corpoEmissoes.safeParse({ ciclo: "2026-10-B", emissoes: [{ matricula: "1", regra: "sia", valor: -1 }] });
    expect(r.success).toBe(false);
  });
});
