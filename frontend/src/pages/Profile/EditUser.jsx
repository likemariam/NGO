import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
import InputField from '../../components/common/InputField.jsx';
import SelectField from '../../components/common/SelectField.jsx';
import Button from '../../components/common/Button.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import Loader from '../../components/common/Loader.jsx';
import { ROLES } from '../../utils/constants';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    password: '', phone: '', role: ROLES.REGULAR_USER,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // useEffect callback cannot be async directly — use an inner async fn
    const load = async () => {
      try {
        const env = await userService.getUser(id);
        const u   = env?.data ?? env;
        setForm({ ...u, password: '' });
      } catch {
        setError('Failed to load user');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await userService.updateUser(id, form);
      navigate('/users');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  if (loading) return <Loader />;

  return (
    <div className="page">
      <h1>Edit User</h1>
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-row">
          <InputField label="First Name" value={form.firstName} onChange={set('firstName')} required />
          <InputField label="Last Name"  value={form.lastName}  onChange={set('lastName')}  required />
        </div>
        <InputField label="Email" type="email" value={form.email} onChange={set('email')} required />
        <InputField label="New Password (leave blank to keep)" type="password" value={form.password} onChange={set('password')} />
        <InputField label="Phone" value={form.phone} onChange={set('phone')} />
        <SelectField
          label="Role" value={form.role} onChange={set('role')}
          options={Object.entries(ROLES).map(([k, v]) => ({ value: v, label: k.replace('_', ' ') }))}
        />
        <ErrorMessage message={error} />
        <Button type="submit" loading={saving}>Save Changes</Button>
      </form>
    </div>
  );
}

export default EditUser;
