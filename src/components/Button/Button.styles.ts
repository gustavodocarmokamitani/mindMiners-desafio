import styled from "styled-components";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "warning";
  disabled?: boolean;
}

export const StyledButton = styled.button<ButtonProps>`
  min-width: 5rem;
  background-color: ${({ variant }) => {
    switch (variant) {
      case "secondary":
        return "#2c2c2c";
      case "danger":
        return "#e63946";
      case "warning":
        return "#f38911ff";
      default:
        return "#0059dd";
    }
  }};
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
    background-color: ${({ variant }) => {
      switch (variant) {
        case "secondary":
          return "#4b5563";
        case "danger":
          return "#a4161a";
        default:
          return "#1d47ba";
      }
    }};
  }
`;
