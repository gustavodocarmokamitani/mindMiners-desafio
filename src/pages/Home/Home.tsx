import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

import type { Operation } from "../../models/Operation";
import type { Option } from "../../models/Option";

import { useIsMobile } from "../../hooks/useIsMobile";
import { fetchStockList } from "../../service/brapi";
import { validateSale } from "../../utils/validateSale";

import OperationForm from "../../components/OperationForm/OperationForm";
import TransactionTable from "../../components/TransactionTable/TransactionTable";
import { CardList } from "../../components/CardList/CardList";
import { Button } from "../../components/Button/Button";

import * as S from "../pages.styles"; 

function Home() {
  const isMobile = useIsMobile();
  const nextId = useRef(1);

  const [operations, setOperations] = useState<Operation[]>(
    JSON.parse(localStorage.getItem("operations") || "[]")
  );
  const [symbolOption, setSymbolOption] = useState<Option[]>(() => {
    const cached = localStorage.getItem("symbolOption");
    return cached ? JSON.parse(cached) : [];
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, setValue, reset, control } =
    useForm<Operation>({
      defaultValues: {
        date: "",
        typeOperation: 1,
        unitPrice: 0,
        quantity: 0,
        tradingFee: 0,
        symbol: "",
      },
    });

  useEffect(() => {
    const saved = localStorage.getItem("operations");
    if (saved) {
      const parsedOperations: Operation[] = JSON.parse(saved);
      setOperations(parsedOperations);

      if (parsedOperations.length > 0) {
        nextId.current = Math.max(...parsedOperations.map((op) => op.id)) + 1;
      }
    }

    handleSearch();
  }, []);

  useEffect(() => {
    localStorage.setItem("operations", JSON.stringify(operations));
  }, [operations]);

  const handleSearch = async () => {
    if (symbolOption.length > 0) return;
    const result = await fetchStockList();
    if (Array.isArray(result)) {
      const sorted = result.sort((a, b) => a.stock.localeCompare(b.stock));
      const options = sorted.map((stock) => ({
        value: stock.stock,
        label: stock.stock,
      }));
      setSymbolOption(options);
      localStorage.setItem("symbolOption", JSON.stringify(options));
    }
  };

  const confirmDeleteOperations = (ids: number[]) => {
    confirmAlert({
      title: "Confirmar exclusão",
      message:
        ids.length > 1
          ? "Tem certeza que deseja apagar as operações selecionadas?"
          : "Tem certeza que deseja apagar a operação selecionada?",
      buttons: [
        {
          label: "Sim",
          onClick: () => deleteOperations(ids),
        },
        {
          label: "Não",
          onClick: () => {},
        },
      ],
    });
  };

  const confirmDeleteSingleOperation = (ids: number) => {
    confirmAlert({
      title: "Confirmar exclusão",
      message: "Tem certeza que deseja apagar a operação selecionada?",
      buttons: [
        {
          label: "Sim",
          onClick: () => deleteSingleOperation(ids),
        },
        {
          label: "Não",
          onClick: () => {},
        },
      ],
    });
  };

  const handleEditClick = () => {
    const id = selectedIds[0];
    const operationToEdit = operations.find((op) => op.id === id);
    if (!operationToEdit) return;

    setEditingId(id);
    setValue("symbol", operationToEdit.symbol);
    setValue("date", operationToEdit.date);
    setValue("typeOperation", operationToEdit.typeOperation);
    setValue("unitPrice", operationToEdit.unitPrice);
    setValue("quantity", operationToEdit.quantity);
    setValue("tradingFee", operationToEdit.tradingFee);
  };

  const handleEditClickById = (id: number) => {
    const operationToEdit = operations.find((op) => op.id === id);
    if (!operationToEdit) return;

    setEditingId(id);
    setValue("symbol", operationToEdit.symbol);
    setValue("date", operationToEdit.date);
    setValue("typeOperation", operationToEdit.typeOperation);
    setValue("unitPrice", operationToEdit.unitPrice);
    setValue("quantity", operationToEdit.quantity);
    setValue("tradingFee", operationToEdit.tradingFee);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = (data: Operation) => {
    if (
      !data.symbol ||
      !data.date ||
      data.typeOperation === undefined ||
      data.unitPrice <= 0 ||
      data.quantity <= 0 ||
      data.tradingFee < 0
    ) {
      toast.error("Preencha todos os campos corretamente.");
      return;
    }

    if (data.typeOperation === 2) {
      const isValidSale = validateSale(
        operations,
        data.symbol,
        data.date,
        data.quantity,
        editingId
      );

      if (!isValidSale) {
        toast.error("Estoque insuficiente para realizar a venda nesta data.");
        return;
      }
    }

    setIsSaving(true);

    if (editingId !== null) {
      // Editando operação existente
      const updated = operations.map((op) =>
        op.id === editingId ? { ...data, id: editingId } : op
      );
      setOperations(updated);
      toast.success("Operação editada com sucesso!");
      setEditingId(null);
      setSelectedIds([]);
    } else {
      // Criando nova operação
      const newOperation = {
        ...data,
        id: nextId.current,
      };
      setOperations((prev) => [...prev, newOperation]);
      nextId.current += 1;
      toast.success("Operação salva com sucesso!");
      setSelectedIds([]);
    }

    setTimeout(() => {
      setIsSaving(false);
      reset();
    }, 300);
  };

  const deleteOperations = (ids: number[]) => {
    if (ids.length === 0) {
      toast.warning("Nenhuma operação selecionada.");
      return;
    }

    setOperations((prev) => prev.filter((op) => !ids.includes(op.id)));
    toast.error("Operações apagadas.");
    setSelectedIds([]);
  };

  const deleteSingleOperation = (id: number) => {
    deleteOperations([id]);
    setSelectedIds([]);
  };

  return (
    <>
      <S.Container>
        <S.ContainerFlex>
          <S.FlexItemForm
            style={{
              marginBottom: operations.length === 0 ? "4rem" : undefined,
            }}
          >
            <S.SectionTitle>Registrar Operação</S.SectionTitle>
            <OperationForm
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              setValue={setValue}
              control={control}
              isSaving={isSaving}
              editingId={editingId}
              onCancelEdit={() => {
                setEditingId(null);
                reset();
              }}
              symbolOption={symbolOption}
            />
          </S.FlexItemForm>

          {operations.length > 0 ? (
            <S.FlexItemTable>
              <S.RowBetween>
                <S.SectionTitle>Histórico de Transações</S.SectionTitle>
                <div style={{ display: "flex", gap: "1rem" }}>
                  {!isMobile && (
                    <>
                      <Button
                        variant="warning"
                        onClick={handleEditClick}
                        title="Editar operação"
                        disabled={selectedIds.length === 1 ? false : true}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          if (selectedIds.length === 0) {
                            toast.warning("Nenhuma operação selecionada.");
                            return;
                          }
                          confirmDeleteOperations(selectedIds);
                        }}
                        title="Apagar operações"
                      >
                        Apagar
                      </Button>
                    </>
                  )}
                </div>
              </S.RowBetween>
              {isMobile ? (
                <CardList
                  data={operations}
                  onDelete={confirmDeleteSingleOperation}
                  onEdit={handleEditClickById}
                />
              ) : (
                <TransactionTable
                  data={operations}
                  selectedIds={selectedIds}
                  onSelectionChange={setSelectedIds}
                />
              )}
            </S.FlexItemTable>
          ) : null}
        </S.ContainerFlex>
      </S.Container>
    </>
  );
}

export default Home;
