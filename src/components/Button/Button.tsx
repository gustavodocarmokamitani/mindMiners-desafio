import React from "react";
import { StyledButton } from "./Button.styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "warning";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  disabled = false,
  children,
  ...rest
}) => {
  return (
    <StyledButton variant={variant} disabled={disabled} {...rest}>
      {children}
    </StyledButton>
  );
};
