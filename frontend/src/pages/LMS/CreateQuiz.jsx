import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lmsService } from '../../services/lmsService';
import InputField from '../../components/common/InputField.jsx';
import Button from '../../components/common/Button.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

const emptyOption = () => ({ optionText: '', isCorrect: false });
const emptyQuestion = (order) => ({ question: '', questionOrder: order, options: [emptyOption(), emptyOption()] });

function CreateQuiz() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', questions: [emptyQuestion(1)] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateQ = (qi, field, value) => {
    const qs = [...form.questions];
    qs[qi] = { ...qs[qi], [field]: value };
    setForm({ ...form, questions: qs });
  };
  const updateOpt = (qi, oi, field, value) => {
    const qs = [...form.questions];
    const opts = [...qs[qi].options];
    if (field === 'isCorrect') opts.forEach((o, i) => { opts[i] = { ...o, isCorrect: i === oi }; });
    else opts[oi] = { ...opts[oi], [field]: value };
    qs[qi] = { ...qs[qi], options: opts };
    setForm({ ...form, questions: qs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await lmsService.createQuiz(form);
      navigate('/lms/quizzes');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Create Quiz</h1>
      <form onSubmit={handleSubmit} className="form-card">
        <InputField label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <div className="field">
          <label>Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} />
        </div>

        <h3>Questions</h3>
        {form.questions.map((q, qi) => (
          <div key={qi} className="question-block">
            <InputField
              label={`Question ${qi + 1}`} value={q.question}
              onChange={(e) => updateQ(qi, 'question', e.target.value)} required
            />
            <div className="options-list">
              {q.options.map((opt, oi) => (
                <div key={oi} className="option-row">
                  <input
                    type="radio" name={`correct-${qi}`} checked={opt.isCorrect}
                    onChange={() => updateOpt(qi, oi, 'isCorrect', true)}
                  />
                  <input
                    type="text" placeholder={`Option ${oi + 1}`} value={opt.optionText}
                    onChange={(e) => updateOpt(qi, oi, 'optionText', e.target.value)} required
                  />
                </div>
              ))}
            </div>
            <Button
              type="button" variant="secondary"
              onClick={() => updateQ(qi, 'options', [...q.options, emptyOption()])}>
              + Add Option
            </Button>
          </div>
        ))}
        <Button type="button" variant="secondary"
          onClick={() => setForm({ ...form, questions: [...form.questions, emptyQuestion(form.questions.length + 1)] })}>
          + Add Question
        </Button>

        <ErrorMessage message={error} />
        <Button type="submit" loading={loading}>Create Quiz</Button>
      </form>
    </div>
  );
}

export default CreateQuiz;
