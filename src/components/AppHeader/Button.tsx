// src/components/Button.tsx
import React from 'react';

type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px',
        background: 'dodgerblue',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      {label}
    </button>
  );
};

export default Button;
