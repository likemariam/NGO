import React from 'react';

function InputField({ label, name, value, onChange, type = 'text', ...props }) {
  return (
    <div className="field">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

export default InputField;
