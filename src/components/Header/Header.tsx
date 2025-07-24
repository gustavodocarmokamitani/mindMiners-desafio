import { useLocation } from "react-router-dom";
import * as S from './Header.styles';

export const Header = () => {
  const location = useLocation();

  const isDashboard = location.pathname.includes("dashboard");

  return (
    <S.Container>
      <S.Header>
        <S.Title>Calculadora Simplificada IR Bolsa</S.Title>
        <S.Subtitle>
          {isDashboard
            ? "Veja o resumo de suas operações abaixo."
            : "Registre suas operações e veja o resultado."}
        </S.Subtitle>
      </S.Header>
    </S.Container>
  );
};
