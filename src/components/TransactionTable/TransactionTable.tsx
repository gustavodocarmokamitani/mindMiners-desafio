import { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
 

import type { GridPaginationModel } from "@mui/x-data-grid";
import type { Operation } from "../../models/Operation";
import type { SelectionModel } from "../../models/SelectionModel";
import { transactionTableColumns } from "../../constants/transactionTableColumns";

interface TransactionTableProps {
  data: Operation[];
  selectedIds: number[];
  onSelectionChange?: (selectedIds: number[]) => void;
}

export default function TransactionTable({
  data,
  selectedIds,
  onSelectionChange,
}: TransactionTableProps) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 8,
  });

  const gridSelectionModel = {
    type: "include",
    ids: new Set(selectedIds),
  } as const;

  const handleRowSelectionChange = (
    newSelectionModel: SelectionModel,
    data: { id: number }[],
    onSelectionChange?: (selectedIds: number[]) => void
  ) => {
    let selectedIds: number[] = [];

    if (Array.isArray(newSelectionModel)) {
      selectedIds = newSelectionModel.map((id) => Number(id));
    } else {
      switch (newSelectionModel.type) {
        case "include": {
          selectedIds = Array.from(newSelectionModel.ids).map((id) =>
            Number(id)
          );
          break;
        }
        case "exclude": {
          const allIds = data.map((row) => row.id);
          selectedIds = allIds.filter((id) => !newSelectionModel.ids.has(id));
          break;
        }
        default:
          selectedIds = [];
      }
    }

    onSelectionChange?.(selectedIds);
  };

  return (
    <div
      style={{
        height: "598px",
        width: "100%",
        borderRadius: "8px",
        boxShadow: " 0 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <DataGrid
        getRowId={(row: Operation) => row.id}
        rowSelectionModel={gridSelectionModel}
        rows={data}
        columns={transactionTableColumns}
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[8, 16, 24]}
        checkboxSelection
        onRowSelectionModelChange={(newSelectionModel) =>
          handleRowSelectionChange(newSelectionModel, data, onSelectionChange)
        }
        sortModel={[
          {
            field: "id",
            sort: "desc",
          },
        ]}
        rowHeight={59}
        disableColumnResize={true}
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
