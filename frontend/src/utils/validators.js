export const validators = {
  required: (value) => (!value || !value.toString().trim() ? 'This field is required' : null),
  email: (value) => (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : null),
  minLength: (min) => (value) => (value?.length < min ? `Minimum ${min} characters required` : null),
  maxLength: (max) => (value) => (value?.length > max ? `Maximum ${max} characters allowed` : null),
  passwordMatch: (password) => (confirm) => (password !== confirm ? 'Passwords do not match' : null),
};
