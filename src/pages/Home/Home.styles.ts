import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  height: 565px;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  margin: 0;
  border: 1px solid #d6d6d6ff;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 2rem;
`;


export const Label = styled.label`
  margin: 0;
  padding: 0;
`;