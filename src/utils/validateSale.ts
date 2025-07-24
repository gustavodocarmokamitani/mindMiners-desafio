import type { Operation } from "../models/Operation";

export function validateSale(
  operations: Operation[],
  simbolo: string,
  dataVenda: string,
  quantidadeVenda: number,
  idEdicao: number | null = null
): boolean {
  // Filtra todas as compras do ativo até a data da venda
  const comprasValidas = operations.filter(
    (op) =>
      op.symbol === simbolo &&
      op.typeOperation === 1 &&
      new Date(op.date) <= new Date(dataVenda)
  );

  const totalComprado = comprasValidas.reduce((acc, op) => acc + op.quantity, 0);

  // Filtra todas as vendas do ativo até a data da venda, exceto a que está sendo editada (se houver)
  const vendasValidas = operations.filter(
    (op) =>
      op.symbol === simbolo &&
      op.typeOperation === 2 &&
      op.id !== idEdicao &&
      new Date(op.date) <= new Date(dataVenda)
  );

  const totalVendido = vendasValidas.reduce((acc, op) => acc + op.quantity, 0);

  const estoqueDisponivel = totalComprado - totalVendido;

  return estoqueDisponivel >= quantidadeVenda;
}
