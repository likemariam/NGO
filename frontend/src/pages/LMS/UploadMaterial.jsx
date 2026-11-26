import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import InputField from '../../components/common/InputField.jsx';
import Button from '../../components/common/Button.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import { MATERIAL_TYPES } from '../../utils/constants';

function UploadMaterial() {
  const [form, setForm] = useState({ title: '', description: '', fileType: 'PDF' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { setError('Please select a file'); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('meta', new Blob([JSON.stringify(form)], { type: 'application/json' }));
      fd.append('file', file);
      await apiClient.post('/materials', fd);
      navigate('/lms/materials');
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Upload Material</h1>
      <form onSubmit={handleSubmit} className="form-card">
        <InputField label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <div className="field">
          <label>Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
        </div>
        <div className="field">
          <label>File Type</label>
          <select value={form.fileType} onChange={(e) => setForm({ ...form, fileType: e.target.value })}>
            {Object.values(MATERIAL_TYPES).map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="field">
          <label>File</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        </div>
        <ErrorMessage message={error} />
        <Button type="submit" loading={loading}>Upload</Button>
      </form>
    </div>
  );
}

export default UploadMaterial;
