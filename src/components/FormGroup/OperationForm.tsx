import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { typeOperation } from "../../data/typeOperation";
import { formatToBRL } from "../../utils/formatters";
import type {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { Operation } from "../../models/Operation";
import type { Option } from "../../models/Option";
import * as S from "../../pages/Home/Home.styles";

type Props = {
  register: UseFormRegister<Operation>;
  handleSubmit: UseFormHandleSubmit<Operation>;
  onSubmit: (data: Operation) => void;
  watch: UseFormWatch<Operation>;
  setValue: UseFormSetValue<Operation>;
  isSaving?: boolean;
  editingId: number | null;
  onCancelEdit?: () => void;
  symbolOption: Option[];
};

const OperationForm = ({
  register,
  handleSubmit,
  onSubmit,
  watch,
  setValue,
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
          <Input
            type="text"
            placeholder="R$"
            onlyNumbers
            value={formatToBRL(watch("unitPrice"))}
            onChange={(e) => {
              const intVal =
                parseInt(e.target.value.replace(/\D/g, ""), 10) || 0;
              setValue("unitPrice", intVal);
            }}
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
              // Converte para número inteiro e elimina zeros à esquerda
              setValue("quantity", isNaN(intValue) ? 0 : intValue);
            }}
          />

          <S.Label htmlFor="tradingFee">Taxa de corretagem</S.Label>
          <Input
            type="text"
            placeholder="R$"
            onlyNumbers
            value={formatToBRL(watch("tradingFee"))}
            onChange={(e) => {
              const intVal =
                parseInt(e.target.value.replace(/\D/g, ""), 10) || 0;
              setValue("tradingFee", intVal);
            }}
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
