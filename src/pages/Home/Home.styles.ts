import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  height: 335px;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem 0;
  margin: 0;
  border: 1px solid #d6d6d6ff;
  border-radius: 8px;
  background: #fff;
  
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 2rem;
`;
