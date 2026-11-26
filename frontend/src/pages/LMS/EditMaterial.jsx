import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import InputField from '../../components/common/InputField.jsx';
import Button from '../../components/common/Button.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import Loader from '../../components/common/Loader.jsx';

function EditMaterial() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', fileType: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient.get(`/materials/${id}`).then((env) => {
      const m = env?.data ?? env;
      setForm({ title: m.title, description: m.description, fileType: m.fileType });
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiClient.put(`/materials/${id}`, form);      navigate('/lms/materials');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page">
      <h1>Edit Material</h1>
      <form onSubmit={handleSubmit} className="form-card">
        <InputField label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <div className="field">
          <label>Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
        </div>
        <ErrorMessage message={error} />
        <Button type="submit" loading={saving}>Save Changes</Button>
      </form>
    </div>
  );
}

export default EditMaterial;
