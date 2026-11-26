import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lmsService } from '../../services/lmsService';
import InputField from '../../components/common/InputField.jsx';
import Button from '../../components/common/Button.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

function CreateQuestionnaire() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', questions: [{ questionText: '', type: 'TEXT', questionOrder: 1 }] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addQuestion = () =>
    setForm({ ...form, questions: [...form.questions, { questionText: '', type: 'TEXT', questionOrder: form.questions.length + 1 }] });

  const updateQuestion = (i, field, value) => {
    const qs = [...form.questions];
    qs[i] = { ...qs[i], [field]: value };
    setForm({ ...form, questions: qs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await lmsService.createQuestionnaire(form);
      navigate('/lms/questionnaires');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create questionnaire');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Create Questionnaire</h1>
      <form onSubmit={handleSubmit} className="form-card">
        <InputField label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <div className="field">
          <label>Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} />
        </div>

        <h3>Questions</h3>
        {form.questions.map((q, i) => (
          <div key={i} className="question-block">
            <InputField
              label={`Question ${i + 1}`}
              value={q.questionText}
              onChange={(e) => updateQuestion(i, 'questionText', e.target.value)}
              required
            />
            <div className="field">
              <label>Type</label>
              <select value={q.type} onChange={(e) => updateQuestion(i, 'type', e.target.value)}>
                {['TEXT', 'RATING', 'BOOLEAN', 'MULTIPLE_CHOICE'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
        ))}
        <Button type="button" variant="secondary" onClick={addQuestion}>+ Add Question</Button>

        <ErrorMessage message={error} />
        <Button type="submit" loading={loading}>Create Questionnaire</Button>
      </form>
    </div>
  );
}

export default CreateQuestionnaire;
