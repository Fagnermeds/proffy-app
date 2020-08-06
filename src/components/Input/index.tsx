import React, { InputHTMLAttributes } from 'react'

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <div>
        <input {...rest} id={name} autoComplete="off" />
      </div>
    </div>
  );
}

export default Input;