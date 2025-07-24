// src/utils/calculator.ts

import type { Operation } from "../models/Operation";
import type { StockCalculationState } from "../models/StockCalculationState";

export type AllStockStates = {
  [key: string]: StockCalculationState;
};

// Tipo para os dados do gráfico de IR, incluindo PM, QM e PA no momento da venda
export interface TaxChartData {
  name: string; // Nome da barra, ex: "PETR4 - Venda #1"
  valor: number; // Valor do IR (já em centavos)
  averagePrice: number; // PM no momento da venda
  averageQuantity: number; // QM no momento da venda (após a venda)
  accumulatedLoss: number; // PA no momento da venda (após a compensação da venda atual)
}

// O tipo de retorno da sua função principal agora incluirá os dados do gráfico
export interface CalculationResults {
  stockStates: AllStockStates;
  taxChartData: TaxChartData[];
}

export function calculateAllStockStates(
  operations: Operation[]
): CalculationResults {
  const stockStates: AllStockStates = {};
  const taxChartData: TaxChartData[] = [];

  const getOrCreateStockState = (symbol: string): StockCalculationState => {
    if (!stockStates[symbol]) {
      stockStates[symbol] = {
        averagePrice: 0,
        averageQuantity: 0,
        accumulatedLoss: 0,
        totalTax: 0,
      };
    }
    return stockStates[symbol];
  };

  const calculateBuyOperation = (operation: Operation): void => {
    const state = getOrCreateStockState(operation.symbol);

    const pc = operation.unitPrice / 100; // Preço de Compra unitário em R$
    const qc = operation.quantity; // Quantidade comprada
    const tc = operation.tradingFee / 100; // Taxa de Corretagem em R$

    if (state.averageQuantity === 0) {
      state.averagePrice = (pc * qc + tc) / qc;
    } else {
      state.averagePrice =
        (state.averagePrice * state.averageQuantity + pc * qc + tc) /
        (state.averageQuantity + qc);
    }
    state.averageQuantity += qc;
  };

  const calculateSellOperation = (operation: Operation): number => {
    const state = getOrCreateStockState(operation.symbol);

    const pv = operation.unitPrice / 100; // Preço de Venda unitário em R$
    const qv = operation.quantity; // Quantidade vendida
    const tv = operation.tradingFee / 100; // Taxa de Corretagem em R$

    if (qv > state.averageQuantity) {
      // Aviso se tentar vender mais do que tem
      console.warn(
        `Atenção: Tentativa de vender ${qv} de ${operation.symbol}, mas você só tem ${state.averageQuantity}.`
      );
    }

    // Resultado Auferido (Lucro/Prejuízo da operação)
    const ra = (pv - state.averagePrice) * qv - tv;
    state.averageQuantity -= qv; // Atualiza a Quantidade Média (reduzindo)

    return ra;
  };

  const accumulateLoss = (symbol: string, result: number): void => {
    const state = getOrCreateStockState(symbol);
    if (result < 0) {
      // Se o resultado da operação foi um prejuízo
      state.accumulatedLoss += result; // Acumula o prejuízo (mantendo-o negativo)
    }
  };

  const calculateTaxAndAdjustLoss = (
    operation: Operation,
    result: number
  ): void => {
    const state = getOrCreateStockState(operation.symbol);

    // Captura o Preço Médio no momento da venda (não muda pela venda em si)
    const pmAtSale = state.averagePrice;
    // Captura a Quantidade Média *APÓS* a venda (já atualizada por calculateSellOperation)
    const qmAtSale = state.averageQuantity;
    // O Prejuízo Acumulado será capturado *após* a sua possível compensação nesta venda,
    // para refletir o estado final do PA após a operação, como no exemplo.

    if (result > 0) {
      // Se a operação gerou lucro
      let taxableProfit = result;

      if (state.accumulatedLoss < 0) {
        // Se há prejuízo acumulado para compensar
        // Calcula o quanto do prejuízo pode ser compensado (mínimo entre lucro atual e prejuízo acumulado)
        const lossToOffset = Math.min(result, Math.abs(state.accumulatedLoss));
        taxableProfit = result - lossToOffset; // Reduz o lucro tributável
        state.accumulatedLoss += lossToOffset; // Reduz o prejuízo acumulado (aproximando de zero ou tornando zero)
      }

      const ir = taxableProfit * 0.15; // Calcula o IR (15% sobre o lucro tributável)
      state.totalTax += ir; // Acumula o IR total para a ação

      if (ir > 0) {
        // Se houver IR a pagar nesta operação
        const formattedDate = operation.date.slice(5, 10).replace("-", "/");
        taxChartData.push({
          name: `${operation.symbol} - ${formattedDate} - Venda #${operation.id}`, // <-- ALTERAÇÃO AQUI
          valor: parseFloat(ir.toFixed(2)) * 100, // IR em centavos para o gráfico
          averagePrice: pmAtSale, // PM no momento da venda
          averageQuantity: qmAtSale, // QM no momento da venda (já ajustada)
          accumulatedLoss: state.accumulatedLoss, // PA no momento da venda (já compensado)
        });
      }
    }
  };

  // Garante que as operações sejam processadas em ordem cronológica para cálculos precisos
  const sortedOperations = [...operations].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  for (const op of sortedOperations) {
    if (op.typeOperation === 1) {
      // Operação de Compra
      calculateBuyOperation(op);
    } else if (op.typeOperation === 2) {
      // Operação de Venda
      const resultAuferido = calculateSellOperation(op);
      accumulateLoss(op.symbol, resultAuferido);
      calculateTaxAndAdjustLoss(op, resultAuferido);
    }
  }

  return {
    stockStates,
    taxChartData,
  };
}
