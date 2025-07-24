// Dashboard.tsx

import { useEffect, useState } from "react";
import * as S from "../pages.styles";
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
import {
  calculateAllStockStates,
  type CalculationResults,
  type TaxChartData,
} from "../../utils/calculator";
import { useIsMobile } from "../../hooks/useIsMobile";

// Componente customizado para o Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data: TaxChartData = payload[0].payload; // Obtém os dados completos da barra
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p>
          <strong>{label}</strong>
        </p>
        <p>
          IR Devido:{" "}
          {(data.valor / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <p>Preço Médio (PM): R$ {data.averagePrice.toFixed(2)}</p>
        <p>Quantidade Média (QM): {data.averageQuantity}</p>
        <p>Prejuízo Acumulado (PA): {data.accumulatedLoss.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

function Dashboard() {
   const isMobile = useIsMobile();
  const [operations, setOperations] = useState<Operation[]>(() => {
    const saved = localStorage.getItem("operations");
    return saved ? JSON.parse(saved) : [];
  });

  const [calculationResults, setCalculationResults] =
    useState<CalculationResults>({
      stockStates: {},
      taxChartData: [],
    });

  useEffect(() => {
    const results = calculateAllStockStates(operations);
    setCalculationResults(results);
  }, [operations]);

  const irPorVenda = calculationResults.taxChartData;

  return (
    <S.Container>
      {operations.length === 0 ? (
        <p>Você ainda não possui operações registradas.</p>
      ) : (
        <>
          <h2>Imposto de Renda por Venda</h2>
          {irPorVenda.length > 0 ? (
            <ResponsiveContainer width={isMobile ? "100%" : "80%"}  height={400}>
              <BarChart data={irPorVenda}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  width={100}
                  tickFormatter={(value: number) =>
                    (value / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  }
                />
                <Tooltip content={<CustomTooltip />} />{" "}
                {/* Usa o componente customizado */}
                <Bar dataKey="valor" fill="#ff7300" barSize={80} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>Nenhum Imposto de Renda a ser pago registrado.</p>
          )}
        </>
      )}
    </S.Container>
  );
}

export default Dashboard;
