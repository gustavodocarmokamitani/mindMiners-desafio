import { useNavigate } from "react-router-dom";
import * as S from "./Navigation.styles";

function Navigation() {
  const navigate = useNavigate();
  
    return (
        <S.Nav>
            <S.ButtonNav  onClick={() => navigate("/")} className="nav-button">Operação</S.ButtonNav>
            <S.ButtonNav  onClick={() => navigate("/dashboard")} className="nav-button">Dashboard</S.ButtonNav>
        </S.Nav>
    );
}

export default Navigation