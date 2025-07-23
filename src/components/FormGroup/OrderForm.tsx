import React, { useState } from "react";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { Select } from "../../components/Select/Select";
import { typeOption } from "../../data/typeOption";
import { formatToBRL } from "../../services/formatters";
import * as S from "../../pages/Home/Home.styles";

function OrderForm() {
  const [operationDate, setOperationDate] = useState<string>("");
  const [typeOperation, setTypeOperation] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [tradingFee, setTradingFee] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  // Usa horário local para evitar erro de fuso (ex: UTC-3 adianta a data).
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    const localDate = new Date(date + "T00:00:00");
    const isoDate = localDate.toISOString().split("T")[0];
    setOperationDate(isoDate);
  };

  // Vamos armazenar o valor em CENTAVOS (como número inteiro) para evitar imprecisões em cálculos
  const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // converte para número inteiro
    const integerNumber = e.target.value ? parseInt(e.target.value, 10) : 0;
    setUnitPrice(integerNumber);
  };

  // Também vamos armazenar em CENTAVOS (número inteiro) para evitar imprecisões em cálculos
  const handleTradingFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Converte para número inteiro
    const integerNumber = e.target.value ? parseInt(e.target.value, 10) : 0;
    setTradingFee(integerNumber);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const integerNumber = e.target.value ? parseInt(e.target.value, 10) : 0;
    setQuantity(integerNumber);
  };

  const handleExecute = () => {
    console.log(
      "operationDate",
      operationDate,
      "typeOperation",
      typeOperation,
      "unitPrice",
      unitPrice,
      "tradingFee",
      tradingFee,
      "quantity",
      quantity
    );
  };

  return (
    <S.FormWrapper>
      <S.InputGroup>
        <Input
          type="date"
          placeholder="Data da operação"
          value={operationDate}
          onChange={handleDateChange}
        />

        <Select
          options={typeOption}
          value={typeOperation}
          onChange={(e) => setTypeOperation(Number(e.target.value))}
        />

        <Input
          type="text"
          placeholder="Preço unitário"
          onlyNumbers
          value={formatToBRL(unitPrice)}
          onChange={handleUnitPriceChange}
        />

        <Input
          type="number"
          placeholder="Quantidade"
          onlyNumbers
          value={quantity === 0 ? "" : quantity}
          onChange={handleQuantityChange}
          step="1"
          min="0"
        />

        <Input
          type="text"
          placeholder="Taxa de corretagem"
          onlyNumbers
          value={tradingFee === 0 ? "" : formatToBRL(tradingFee)}
          onChange={handleTradingFeeChange}
        />
      </S.InputGroup>

      <S.ButtonGroup>
        <Button variant="primary" onClick={handleExecute}>
          Executar
        </Button>
      </S.ButtonGroup>
    </S.FormWrapper>
  );
}

export default OrderForm;
