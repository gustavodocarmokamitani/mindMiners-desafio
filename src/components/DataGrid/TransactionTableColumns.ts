import type { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { formatarDataManual, formatToBRL } from "../../utils/formatters";

export const TransactionTableColumns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 90 },
  {
    field: "symbol",
    headerName: "Ativo",
    width: 110,
  },
  {
    field: "date",
    headerName: "Data",
    width: 110,
    valueFormatter: (params) => {
      const date = params;
      return formatarDataManual(date);
    },
  },
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
    field: "unitPrice",
    headerName: "Preço (R$)",
    type: "number",
    width: 145,
    valueFormatter: (params: GridCellParams) => {
      return formatToBRL(Number(params));
    },
  },
  { field: "quantity", headerName: "Qtd.", type: "number", width: 100 },
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
