import OperationForm from "../../components/FormGroup/OperationForm";
import TransactionTable from "../../components/DataGrid/TransactionTable";
import { useIsMobile } from "../../hooks/useIsMobile";
import { confirmAlert } from "react-confirm-alert";
import * as S from "../pages.styles";
import { CardList } from "../../components/CardList/CardList";
import type { Operation } from "../../models/Operation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../components/Button/Button";

function Home() {
  const isMobile = useIsMobile();
  const nextId = useRef(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [operations, setOperations] = useState<Operation[]>(
    JSON.parse(localStorage.getItem("operations") || "[]")
  );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, watch, setValue, reset } = useForm<Operation>(
    {
      defaultValues: {
        date: "",
        typeOperation: 0,
        unitPrice: 0,
        quantity: 0,
        tradingFee: 0,
      },
    }
  );

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

  const onSubmit = (data: Operation) => {
    setIsSaving(true);

    if (editingId !== null) {
      // Editando operação existente
      const updated = operations.map((op) =>
        op.id === editingId ? { ...data, id: editingId } : op
      );
      setOperations(updated);
      toast.success("Operação editada com sucesso!");
      setEditingId(null);
    } else {
      // Criando nova operação
      const newOperation = {
        ...data,
        id: nextId.current,
      };
      setOperations((prev) => [...prev, newOperation]);
      nextId.current += 1;
      toast.success("Operação salva com sucesso!");
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
  };

  const deleteSingleOperation = (id: number) => {
    deleteOperations([id]);
  };

  useEffect(() => {
    const saved = localStorage.getItem("operations");
    if (saved) {
      const parsedOperations: Operation[] = JSON.parse(saved);
      setOperations(parsedOperations);

      if (parsedOperations.length > 0) {
        nextId.current = Math.max(...parsedOperations.map((op) => op.id)) + 1;
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("operations", JSON.stringify(operations));
  }, [operations]);

  return (
    <S.Container>
      <S.Header>
        <S.Title>Calculadora Simplificada IR Bolsa</S.Title>
        <S.Subtitle>Registre suas operações e veja o resultado.</S.Subtitle>
      </S.Header>

      <S.ContainerFlex>
        <S.FlexItemForm>
          <S.SectionTitle>Registrar Operação</S.SectionTitle>
          <OperationForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            watch={watch}
            setValue={setValue}
            isSaving={isSaving}
            editingId={editingId}
          />
        </S.FlexItemForm>

        {operations.length > 0 ? (
          <S.FlexItemTable>
            <S.RowBetween>
              <S.SectionTitle>Histórico de Transações</S.SectionTitle>
              <div style={{ display: "flex", gap: "1rem" }}>
                {!isMobile && selectedIds.length === 1 && (
                  <Button
                    variant="warning"
                    onClick={() => {
                      const id = selectedIds[0];
                      const operationToEdit = operations.find(
                        (op) => op.id === id
                      );
                      if (!operationToEdit) return;

                      setEditingId(id);
                      setValue("date", operationToEdit.date);
                      setValue("typeOperation", operationToEdit.typeOperation);
                      setValue("unitPrice", operationToEdit.unitPrice);
                      setValue("quantity", operationToEdit.quantity);
                      setValue("tradingFee", operationToEdit.tradingFee);
                    }}
                    title="Editar operação"
                  >
                    Editar
                  </Button>
                )}
                {!isMobile && (
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
                )}
              </div>
            </S.RowBetween>
            {isMobile ? (
              <CardList
                data={operations}
                onDelete={confirmDeleteSingleOperation}
              />
            ) : (
              <TransactionTable
                data={operations}
                onSelectionChange={setSelectedIds}
              />
            )}
          </S.FlexItemTable>
        ) : null}
      </S.ContainerFlex>
    </S.Container>
  );
}

export default Home;
