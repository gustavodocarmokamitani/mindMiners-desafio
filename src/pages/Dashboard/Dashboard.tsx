import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import type { Operation } from "../../models/Operation";
import type { CalculationResults, TaxChartData } from "../../utils/calculator";

import { calculateAllStockStates } from "../../utils/calculator";

import { useIsMobile } from "../../hooks/useIsMobile";

import * as S from "../pages.styles";
import * as D from "./Dashboard.styles";
import type { CustomTooltipProps } from "../../models/CustomTooltip";

// Componente customizado para o Tooltip
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data: TaxChartData = payload[0].payload; // Obtém os dados completos da barra
    return (
      <D.TooltipContainer>
        <p>
          <strong>{label}</strong>
        </p>
        <p>
          IR Devido:{" "}
          {(data.value / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <p>Preço Médio (PM): R$ {data.averagePrice.toFixed(2)}</p>
        <p>Quantidade Média (QM): {data.averageQuantity}</p>
        <p>Prejuízo Acumulado (PA): {data.accumulatedLoss.toFixed(2)}</p>
      </D.TooltipContainer>
    );
  }
  return null;
};

function Dashboard() {
  const isMobile = useIsMobile();
  const [operations] = useState<Operation[]>(() => {
    const saved = localStorage.getItem("operations");
    return saved ? JSON.parse(saved) : [];
  });
console.log(operations);

  const [calculationResults, setCalculationResults] =
    useState<CalculationResults>({
      stockStates: {},
      taxChartData: [],
    });

  useEffect(() => {
    const results = calculateAllStockStates(operations);
    setCalculationResults(results);
  }, [operations]);

  const irPerSale = calculationResults.taxChartData;

  return (
    <S.Container>
      {operations.length === 0 ? (
        <p>Você ainda não possui operações registradas.</p>
      ) : (
        <>
          <D.ChartWrapper>
            {irPerSale.length > 0 ? (
              <>
                <h2>Imposto de Renda por Venda</h2>
                <ResponsiveContainer
                  width={isMobile ? "100%" : "90%"}
                  height={450}
                >
                  <BarChart data={irPerSale}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      style={{ fontSize: isMobile ? 12 : 16 }}
                    />
                    <YAxis
                      style={{ fontSize: isMobile ? 12 : 16 }}
                      width={100}
                      tickFormatter={(value: number) =>
                        (value / 100).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })
                      }
                    />
                    <Tooltip content={<CustomTooltip />} />{" "}
                    <Bar
                      dataKey="value"
                      fill="#ff7300"
                      barSize={isMobile ? 20 : 40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </>
            ) : (
              <p>Nenhum Imposto de Renda a ser pago registrado.</p>
            )}
          </D.ChartWrapper>
        </>
      )}
    </S.Container>
  );
}

export default Dashboard;
