import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { profileService } from '../../services/profileService';
import InputField from '../../components/common/InputField.jsx';
import Button from '../../components/common/Button.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

function EditProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: user?.firstName || '', lastName: user?.lastName || '', phone: user?.phone || '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await profileService.updateProfile(form);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Edit Profile</h1>
      <form className="form-card" onSubmit={handleSubmit}>
        <InputField label="First Name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
        <InputField label="Last Name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
        <InputField label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <ErrorMessage message={error} />
        <Button type="submit" loading={loading}>Save Changes</Button>
      </form>
    </div>
  );
}

export default EditProfile;
