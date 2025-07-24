import { styled } from "styled-components";

export const Container = styled.div`
  background: linear-gradient(270deg,#fff,#f6f9fe);
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.header`
  width: 100%;
  max-width: 960px;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333333;
  margin: 0;
`;

export const Subtitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 400;
  color: #6b7280;
  margin: 0.5rem 0 0;
`;