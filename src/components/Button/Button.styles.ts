import styled from "styled-components";

interface ButtonProps {
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export const StyledButton = styled.button<ButtonProps>`
  min-width: 10rem;
  background-color: ${({ variant }) =>
    variant === "secondary" ? "#2c2c2c" : "#2563eb"};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    background-color: ${({ variant }) =>
      variant === "secondary" ? "#4b5563" : "#1d4ed8"};
  }
`;
