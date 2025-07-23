import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TransactionTableColumns } from "./TransactionTableColumns";
import type { GridPaginationModel } from "@mui/x-data-grid";
import type { Operation } from "../../models/Operation";

interface TransactionTableProps {
  data: Operation[];
  onSelectionChange?: (selectedIds: number[]) => void;
}

export default function TransactionTable({
  data,
  onSelectionChange,
}: TransactionTableProps) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  return (
    <div
      style={{
        height: 400,
        width: "100%",
        borderRadius: "8px",
        boxShadow: " 0 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <DataGrid
        getRowId={(row: Operation) => row.id}
        rows={data}
        columns={TransactionTableColumns}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        disableColumnResize={true}
        checkboxSelection
        onRowSelectionModelChange={(newSelectionModel) => {
          let selectedIds: number[] = [];
          if (Array.isArray(newSelectionModel)) {
            selectedIds = newSelectionModel.map((id) => Number(id));
          } else {
            if (newSelectionModel.type === "include") {
              selectedIds = Array.from(newSelectionModel.ids).map((id) =>
                Number(id)
              );
            } else if (newSelectionModel.type === "exclude") {
              const allIds = data.map((row) => row.id);
              selectedIds = allIds.filter(
                (id) => !newSelectionModel.ids.has(id)
              );
            }
          }

          onSelectionChange?.(selectedIds);
        }}
        rowHeight={57}
        sortModel={[
          {
            field: "id",
            sort: "desc",
          },
        ]}
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "0 0.8rem",
          "& .MuiDataGrid-filler": {
            display: "none",
          },
        }}
      />
    </div>
  );
}
