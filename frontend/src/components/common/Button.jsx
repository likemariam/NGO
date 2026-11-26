import React from 'react';

function Button({ children, variant = 'primary', loading, disabled, ...props }) {
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Please wait…' : children}
    </button>
  );
}

export default Button;
