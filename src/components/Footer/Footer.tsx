import * as S from "./Footer.styles";

export const Footer = () => (
    <S.FooterContainer>
        © {new Date().getFullYear()} Gustavo Kamitani — Desafio mindMiners
    </S.FooterContainer>
);