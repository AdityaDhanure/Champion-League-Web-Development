import { useState, useEffect, useMemo } from 'react';

// Utility function to decode HTML entities
const decodeHtml = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const QuestionCard = ({ question, selectedAnswer, onAnswerSelect }) => {
  const { question: questionText, correct_answer, incorrect_answers } = question || {};

  // Combine correct and incorrect answers using useMemo to avoid recalculating
  const combinedAnswers = useMemo(() => {
    return correct_answer && incorrect_answers ? [correct_answer, ...incorrect_answers] : [];
  }, [correct_answer, incorrect_answers]);

  // Local state for shuffled answers
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  // Effect to shuffle answers once when the question changes
  useEffect(() => {
    if (combinedAnswers.length > 0) {
      setShuffledAnswers(shuffleArray([...combinedAnswers]));
    }
  }, [combinedAnswers]);

  // Decode the question and answers
  const decodedQuestionText = decodeHtml(questionText || ''); // Fallback to empty string if undefined
  const decodedAnswers = shuffledAnswers.map(answer => decodeHtml(answer));

  const handleAnswerChange = (answer) => {
    onAnswerSelect(answer); // Pass the selected answer back to the parent
  };

  // Debugging logs
  console.log('Question:', questionText);
  console.log('Correct Answer:', correct_answer);
  console.log('Incorrect Answers:', incorrect_answers);
  console.log('Decoded Answers:', decodedAnswers);

  if (!question) {
    return <p>No question available</p>; // Fallback if question is undefined
  }

  return (
    <div className="question-card bg-gray-100 p-4 mb-4 rounded">
      <h2 className="font-bold">{decodedQuestionText}</h2>
      <form>
        <ul>
          {decodedAnswers.map((answer, index) => (
            <li key={index}>
              <label>
                <input
                  type="radio"
                  name="answer"
                  value={answer}
                  checked={selectedAnswer === answer}
                  onChange={() => handleAnswerChange(answer)}
                />
                {answer}
              </label>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default QuestionCard;
