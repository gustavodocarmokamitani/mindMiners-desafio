import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 740px;
  overflow-y: auto;
  margin-bottom: 1rem;
  border-radius: 8px;
  padding: 1rem 0rem;
  width: 100%;
`;

export const Card = styled.div`
  position: relative;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  padding: 1.5rem 2rem;
  margin: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }

  .card-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    min-width: 150px;
  }

  p {
    margin: 0.25rem 0;
    font-size: 0.95rem;
    color: #374151;

    strong {
      color: #111827;
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 5rem;
  width: 100%;
`;

export const PageButton = styled.button`
  padding: 0.5rem 1.25rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

export const EditButton = styled.span`
  position: absolute;
  right: 40px;
  top: -15px;
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  border-left: 1px solid #e5e7eb;
  border-radius: 50px 0 0 50px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #f38911;
  font-size: 1.3rem;
  padding: 0 0.5rem;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    right: 50px;
  }  
`;

export const DeleteButton = styled.span`
  position: absolute;
  right: 5px;
  top: -15px;
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  border-right: 1px solid #e5e7eb;
  border-radius: 0 50px 50px 0;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #e63946;
  font-size: 1.3rem;
  padding: 0 0.5rem;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    right: -5px;
  }
`;
