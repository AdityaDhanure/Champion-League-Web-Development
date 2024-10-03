// src/components/QuestionCard.jsx
import { useState, useEffect } from 'react';

const QuestionCard = ({ question, selectedAnswer, onAnswerSelect }) => {
  const { question: questionText, answers, correct_answers, multiple_correct_answers } = question;
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState(selectedAnswer || {});

  // Update the local state when selectedAnswer changes (when moving between questions)
  useEffect(() => {
    setLocalSelectedAnswer(selectedAnswer || {});
  }, [selectedAnswer]);

  const handleAnswerChange = (answerKey) => {
    const newAnswer = { [answerKey]: true };
    setLocalSelectedAnswer(newAnswer);
    onAnswerSelect(newAnswer); // Pass the selected answer back to the parent component
  };

  return (
    <div className="question-card bg-gray-100 p-4 mb-4 rounded">
      <h2 className="font-bold">{questionText}</h2>
      <form>
        <ul>
          {Object.entries(answers).map(([key, answer]) => (
            answer && (
              <li key={key}>
                <label>
                  <input
                    type={multiple_correct_answers === 'true' ? 'checkbox' : 'radio'}
                    name="answer"
                    value={key}
                    checked={localSelectedAnswer[key] || false} // Ensure the right answer is selected
                    onChange={() => handleAnswerChange(key)}
                  />
                  {answer}
                </label>
              </li>
            )
          ))}
        </ul>
      </form>
    </div>
  );
};

export default QuestionCard;
