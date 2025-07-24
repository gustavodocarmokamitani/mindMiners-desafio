import React from "react";
import { SelectWrapper, StyledSelect, ArrowIcon } from "./Select.styles";
import type { Option } from "../../models/Option";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}

export const Select = ({ options, value, onChange, ...rest }: SelectProps) => {
  return (
    <SelectWrapper>
      <StyledSelect value={value} onChange={onChange} {...rest}>
        <option value="" disabled>Selecione...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </StyledSelect>
      <ArrowIcon />
    </SelectWrapper>
  );
};
