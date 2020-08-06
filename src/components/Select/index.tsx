import React, { SelectHTMLAttributes } from 'react'

import './styles.css';

interface ItemsProps {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<ItemsProps>;
}

const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" {...rest} id={name}>
        <option
          value=""
          disabled
          hidden
        >
          Selecione uma opção
        </option>
        
        {options.map(item => (
          <option key={item.value} value={item.value}>{item.label}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;