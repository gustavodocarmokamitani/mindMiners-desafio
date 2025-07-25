import {
  Controller,
  type Control,
  type UseFormHandleSubmit,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";

import type { Operation } from "../../models/Operation";
import type { Option } from "../../models/Option";

import { typeOperation } from "../../constants/typeOperation";
import { formatToBRL } from "../../utils/formatters";

import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";

import * as S from "../../pages/Home/Home.styles";

type Props = {
  register: UseFormRegister<Operation>;
  handleSubmit: UseFormHandleSubmit<Operation>;
  onSubmit: (data: Operation) => void;
  setValue: UseFormSetValue<Operation>;
  control: Control<Operation>;

  isSaving?: boolean;
  editingId: number | null;
  onCancelEdit?: () => void;

  symbolOption: Option[];
};

const OperationForm = ({
  register,
  handleSubmit,
  onSubmit,
  setValue,
  control,
  isSaving,
  editingId,
  onCancelEdit,
  symbolOption,
}: Props) => {
  return (
    <S.FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.InputGroup>
          <label htmlFor="symbol">Ativo:</label>
          <Select options={symbolOption} {...register("symbol")} />

          <S.Label htmlFor="date">Data da operação</S.Label>
          <Input
            type="date"
            placeholder="Data da operação"
            {...register("date")}
          />

          <S.Label htmlFor="typeOperation">Tipo da operação</S.Label>
          <Select
            options={typeOperation}
            {...register("typeOperation", { valueAsNumber: true })}
          />

          <S.Label htmlFor="unitPrice">Preço unitário</S.Label>
          <Controller
            name="unitPrice"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="R$"
                onlyNumbers
                value={formatToBRL(field.value)}
                onChange={(e) => {
                  const intVal =
                    parseInt(e.target.value.replace(/\D/g, ""), 10) || 0;
                  field.onChange(intVal);
                }}
              />
            )}
          />

          <S.Label htmlFor="quantity">Quantidade</S.Label>
          <Input
            type="number"
            placeholder="Quantidade"
            onlyNumbers
            step="1"
            min="0"
            {...register("quantity", { valueAsNumber: true })}
            onChange={(e) => {
              const value = e.target.value;
              const intValue = parseInt(value, 10);
              setValue("quantity", isNaN(intValue) ? 0 : intValue); // Converte para número inteiro e elimina zeros à esquerda
            }}
          />

          <S.Label htmlFor="tradingFee">Taxa de corretagem</S.Label>
          <Controller
            name="tradingFee"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="R$"
                onlyNumbers
                value={formatToBRL(field.value)}
                onChange={(e) => {
                  const intVal =
                    parseInt(e.target.value.replace(/\D/g, ""), 10) || 0;
                  field.onChange(intVal);
                }}
              />
            )}
          />
        </S.InputGroup>

        <S.ButtonGroup>
          <div
            style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
          >
            <Button variant="primary" type="submit" disabled={isSaving}>
              {isSaving
                ? editingId !== null
                  ? "Editando..."
                  : "Salvando..."
                : editingId !== null
                ? "Editar"
                : "Executar"}
            </Button>
            {editingId !== null && (
              <Button
                variant="secondary"
                type="button"
                disabled={isSaving}
                onClick={onCancelEdit}
              >
                Cancelar
              </Button>
            )}
          </div>
        </S.ButtonGroup>
      </form>
    </S.FormWrapper>
  );
};

export default OperationForm;
