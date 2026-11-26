import React from 'react';

function QuestionnaireForm({ questions, responses, onChange }) {
  return (
    <div className="questionnaire-form">
      {questions.map((q, i) => (
        <div key={q.id} className="question-block">
          <p className="question-text">{i + 1}. {q.questionText}</p>
          {q.type === 'TEXT' && (
            <textarea
              rows={2}
              value={responses[q.id] || ''}
              onChange={(e) => onChange(q.id, e.target.value)}
              placeholder="Your answer…"
            />
          )}
          {q.type === 'RATING' && (
            <div className="rating-row">
              {[1, 2, 3, 4, 5].map((n) => (
                <label key={n}>
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value={n}
                    checked={responses[q.id] === n}
                    onChange={() => onChange(q.id, n)}
                  />
                  {n}
                </label>
              ))}
            </div>
          )}
          {q.type === 'BOOLEAN' && (
            <div className="bool-row">
              {['Yes', 'No'].map((v) => (
                <label key={v}>
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value={v}
                    checked={responses[q.id] === v}
                    onChange={() => onChange(q.id, v)}
                  />
                  {v}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default QuestionnaireForm;
