import React from "react";
import { StyledInput } from "./Input.styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onlyNumbers?: boolean;
}

export const Input: React.FC<InputProps> = ({
  onlyNumbers = false,
  onChange,
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onlyNumbers) {
      e.target.value = e.target.value.replace(/\D/g, "");
    }

    if (onChange) {
      onChange(e);
    }
  };

  return <StyledInput {...rest} onChange={handleChange} />;
};
