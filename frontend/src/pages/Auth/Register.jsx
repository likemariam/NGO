import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import InputField from '../../components/common/InputField.jsx';
import SelectField from '../../components/common/SelectField.jsx';
import Button from '../../components/common/Button.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import { ROLES } from '../../utils/constants';

function Register() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', phone: '',
    role: ROLES.REGULAR_USER,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    try {
      await authService.register(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>NGO DMS</h1>
        <h2>Create a new account</h2>

        <div className="form-row">
          <InputField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required />
          <InputField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} required />
        </div>

        <InputField label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
        <InputField label="Phone" name="phone" value={form.phone} onChange={handleChange} />

        <InputField
          label="Password (min 8 chars)" type="password" name="password"
          value={form.password} onChange={handleChange} required
        />

        <SelectField
          label="Role" name="role" value={form.role} onChange={handleChange}
          options={Object.entries(ROLES).map(([key, value]) => ({ value, label: key.replace('_', ' ') }))}
        />

        <ErrorMessage message={error} />
        <Button type="submit" variant="primary" loading={loading}>Register</Button>

        <div className="auth-links">
          <span>
            Already have an account? <Link to="/login">Sign in</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
