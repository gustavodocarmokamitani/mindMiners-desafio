import type { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { formatToBRL } from "../../utils/formatters";

export const TransactionTableColumns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 90 },
  {
    field: "typeOperation",
    headerName: "Tipo",
    width: 100,
    valueFormatter: (params: GridCellParams) => {
      if (Number(params) === 1) {
        return "Compra";
      }
      if (Number(params) === 2) {
        return "Venda";
      }
      return "Desconhecido";
    },
  },
  {
    field: "date",
    headerName: "Data",
    width: 110,
    valueFormatter: (params) => {
      const date = params;
      return new Date(date).toLocaleDateString("pt-BR");
    },
  },
  { field: "quantity", headerName: "Qtd.", type: "number", width: 100 },
  {
    field: "unitPrice",
    headerName: "Preço (R$)",
    type: "number",
    width: 145,
    valueFormatter: (params: GridCellParams) => {
      return formatToBRL(Number(params));
    },
  },
  {
    field: "tradingFee",
    headerName: "Taxa de corretagem (R$)",
    type: "number",
    width: 230,
    valueFormatter: (params: GridCellParams) => {
      return formatToBRL(Number(params));
    },
  },
];
