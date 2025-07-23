import styled from "styled-components";

export const SelectWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  appearance: none;

  &::-ms-expand {
    display: none;
  }
`;

export const ArrowIcon = styled.div`
  position: absolute;
  top: 35%;
  right: 1rem;
  width: 1em;
  height: 1em; 
  background: url("data:image/svg+xml;utf8,<svg fill='gray' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'><polygon points='0,0 20,0 10,10'/></svg>")
    no-repeat center;
  background-size: contain;
`;
