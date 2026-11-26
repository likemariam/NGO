import React from 'react';

function SelectField({ label, name, value, onChange, options = [], ...props }) {
  return (
    <div className="field">
      {label && <label htmlFor={name}>{label}</label>}
      <select id={name} name={name} value={value} onChange={onChange} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
