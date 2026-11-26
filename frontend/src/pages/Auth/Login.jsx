import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLE_DASHBOARD_MAP } from '../../utils/constants';
import InputField from '../../components/common/InputField.jsx';
import Button from '../../components/common/Button.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login({ email, password });
      navigate(ROLE_DASHBOARD_MAP[user.role] || '/dashboard/user');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>NGO DMS</h1>
        <h2>Sign in to your account</h2>

        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <ErrorMessage message={error} />
        <Button type="submit" variant="primary" loading={loading}>
          Sign In
        </Button>

        <div className="auth-links">
          <Link to="/forgot-password">Forgot password?</Link>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
