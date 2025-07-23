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
import * as S from "../../pages/Home/Home.styles";

type Props = {
  register: UseFormRegister<Operation>;
  handleSubmit: UseFormHandleSubmit<Operation>;
  onSubmit: (data: Operation) => void;
  watch: UseFormWatch<Operation>;
  setValue: UseFormSetValue<Operation>;
  isSaving?: boolean;
  editingId: number | null;
};

const OperationForm = ({
  register,
  handleSubmit,
  onSubmit,
  watch,
  setValue,
  isSaving,
  editingId,
}: Props) => {
  return (
    <S.FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.InputGroup>
          <Input
            type="date"
            placeholder="Data da operação"
            {...register("date")}
          />

          <Select options={typeOperation} {...register("typeOperation")} />

          <Input
            type="text"
            placeholder="Preço unitário"
            onlyNumbers
            value={formatToBRL(watch("unitPrice"))}
            onChange={(e) => {
              const intVal =
                parseInt(e.target.value.replace(/\D/g, ""), 10) || 0;
              setValue("unitPrice", intVal);
            }}
          />

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

          <Input
            type="text"
            placeholder="Taxa de corretagem"
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
          <Button variant="primary" type="submit" disabled={isSaving}>
            {isSaving
              ? editingId !== null
                ? "Editando..."
                : "Salvando..."
              : editingId !== null
              ? "Editar"
              : "Executar"}
          </Button>
        </S.ButtonGroup>
      </form>
    </S.FormWrapper>
  );
};

export default OperationForm;
