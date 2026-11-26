import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
import InputField from '../../components/common/InputField.jsx';
import SelectField from '../../components/common/SelectField.jsx';
import Button from '../../components/common/Button.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import { ROLES } from '../../utils/constants';

function CreateUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', phone: '', role: ROLES.REGULAR_USER });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userService.createUser(form);
      navigate('/users');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="page">
      <h1>Create User</h1>
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-row">
          <InputField label="First Name" value={form.firstName} onChange={set('firstName')} required />
          <InputField label="Last Name" value={form.lastName} onChange={set('lastName')} required />
        </div>
        <InputField label="Email" type="email" value={form.email} onChange={set('email')} required />
        <InputField label="Password" type="password" value={form.password} onChange={set('password')} required />
        <InputField label="Phone" value={form.phone} onChange={set('phone')} />
        <SelectField label="Role" value={form.role} onChange={set('role')}
          options={Object.entries(ROLES).map(([k, v]) => ({ value: v, label: k.replace('_', ' ') }))} />
        <ErrorMessage message={error} />
        <Button type="submit" loading={loading}>Create User</Button>
      </form>
    </div>
  );
}

export default CreateUser;
