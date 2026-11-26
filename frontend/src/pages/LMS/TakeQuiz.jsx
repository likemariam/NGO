import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useAuth } from '../../hooks/useAuth';
import { lmsService } from '../../services/lmsService';
import Button from '../../components/common/Button.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: quiz, loading, error } = useFetch(`/quizzes/${id}`);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(answers).length < quiz.questions.length) {
      setSubmitError('Please answer all questions');
      return;
    }
    setSubmitting(true);
    try {
      await lmsService.submitQuiz(id, { answers, userId: user.userId });
      navigate(`/lms/quizzes/results/${id}`);
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!quiz) return null;

  return (
    <div className="page">
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>
      <form onSubmit={handleSubmit} className="quiz-form">
        {quiz.questions?.map((q, i) => (
          <div key={q.id} className="question-block">
            <p className="question-text">{i + 1}. {q.question}</p>
            <div className="options-list">
              {q.options?.map((opt) => (
                <label key={opt.id} className="option-label">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value={opt.id}
                    checked={answers[q.id] === opt.id}
                    onChange={() => setAnswers({ ...answers, [q.id]: opt.id })}
                  />
                  {opt.optionText}
                </label>
              ))}
            </div>
          </div>
        ))}
        <ErrorMessage message={submitError} />
        <Button type="submit" loading={submitting}>Submit Quiz</Button>
      </form>
    </div>
  );
}

export default TakeQuiz;
