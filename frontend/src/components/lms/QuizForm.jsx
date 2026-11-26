import React from 'react';

function QuizForm({ questions, answers, onChange }) {
  return (
    <div className="quiz-form">
      {questions.map((q, i) => (
        <div key={q.id} className="question-block">
          <p className="question-text">{i + 1}. {q.question}</p>
          <div className="options-list">
            {q.options.map((opt) => (
              <label key={opt.id} className="option-label">
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={opt.id}
                  checked={answers[q.id] === opt.id}
                  onChange={() => onChange(q.id, opt.id)}
                />
                {opt.optionText}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuizForm;
