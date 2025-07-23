import OrderForm from "../../components/FormGroup/OrderForm";
import TransactionTable from "../../components/DataGrid/TransactionTable";
import { useIsMobile } from "../../hooks/useIsMobile";
import * as S from "../pages.styles";
import { CardList } from "../../components/CardList/CardList";

function Home() {
  const isMobile = useIsMobile();

  const rows = [
    {
      id: 1,
      date: "2025/07/22",
      typeOption: 1,
      unitPrice: 12.5,
      quantity: 10,
      tradingFee: 8.5,
    },
    {
      id: 2,
      date: "2025/07/23",
      typeOption: 2,
      unitPrice: 15,
      quantity: 5,
      tradingFee: 8.5,
    },
    {
      id: 3,
      date: "2025/07/22",
      typeOption: 1,
      unitPrice: 12.5,
      quantity: 10,
      tradingFee: 8.5,
    },
    {
      id: 4,
      date: "2025/07/23",
      typeOption: 2,
      unitPrice: 15,
      quantity: 5,
      tradingFee: 8.5,
    },
    {
      id: 5,
      date: "2025/07/22",
      typeOption: 1,
      unitPrice: 12.5,
      quantity: 10,
      tradingFee: 8.5,
    },
    {
      id: 6,
      date: "2025/07/23",
      typeOption: 2,
      unitPrice: 15,
      quantity: 5,
      tradingFee: 8.5,
    },
    {
      id: 7,
      date: "2025/07/22",
      typeOption: 1,
      unitPrice: 12.5,
      quantity: 10,
      tradingFee: 8.5,
    },
    {
      id: 8,
      date: "2025/07/26",
      typeOption: 2,
      unitPrice: 15,
      quantity: 5,
      tradingFee: 8.5,
    },
  ];
  return (
    <S.Container>
      <S.Header>
        <S.Title>Calculadora Simplificada IR Bolsa</S.Title>
        <S.Subtitle>Registre suas operações e veja o resultado</S.Subtitle>
      </S.Header>

      <S.ContainerFlex>
        <S.FlexItemForm>
          <OrderForm />
        </S.FlexItemForm>

        <S.FlexItemTable>
          {isMobile ? (
            <CardList data={rows} />
          ) : (
            <TransactionTable data={rows} />
          )}
        </S.FlexItemTable>
      </S.ContainerFlex>
    </S.Container>
  );
}

export default Home;
