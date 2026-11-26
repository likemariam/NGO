import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import InputField from '../../components/common/InputField.jsx';
import Button from '../../components/common/Button.jsx';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch {
      setSent(true); // don't reveal whether email exists
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>NGO DMS</h1>
        <h2>Reset your password</h2>

        {sent ? (
          <p className="success-text">
            If an account exists for <strong>{email}</strong>, a reset link has been sent.
          </p>
        ) : (
          <>
            <InputField
              label="Email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required
            />
            <Button type="submit" variant="primary">Send Reset Link</Button>
          </>
        )}

        <div className="auth-links">
          <Link to="/login">Back to sign in</Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
