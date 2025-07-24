export interface StockCalculationState {
  averagePrice: number; // PM - Preço Médio
  averageQuantity: number; // QM - Quantidade Média
  accumulatedLoss: number; // PA - Prejuízo Acumulado (será um valor negativo ou zero)
  totalTax: number; // IR - Imposto de Renda
}
