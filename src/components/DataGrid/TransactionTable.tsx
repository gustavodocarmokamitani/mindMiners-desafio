import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import type { Operation } from "../../models/Operation";

const columns: GridColDef[] = [
  { field: "typeOption", headerName: "Tipo", width: 130 },
  { field: "date", headerName: "Data", width: 130 },
  { field: "quantity", headerName: "Quantidade", type: "number", width: 110 },
  { field: "unitPrice", headerName: "Preço (R$)", type: "number", width: 130 },
  {
    field: "tradingFee",
    headerName: "Taxa de corretagem (R$)",
    type: "number",
    width: 200,
  },
];

interface TransactionTableProps {
  data: Operation[];
}

export default function TransactionTable({ data }: TransactionTableProps) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  return (
    <div style={{ height: 400, width: "100%", boxShadow: " 0 4px 12px rgba(0, 0, 0, 0.2)" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
}
