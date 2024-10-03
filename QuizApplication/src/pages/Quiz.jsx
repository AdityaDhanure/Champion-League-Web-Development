// src/pages/Quiz.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionCard from '@/components/QuestionCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Quiz = () => {
  const { category } = useParams(); // Extract category from URL
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://quizapi.io/api/v1/questions`, 
          {
            params: {
              apiKey: import.meta.env.VITE_QUIZ_API_KEY,
              category: category,
              limit: 10 // Fetch 10 questions for the selected category
            }
          }
        );
        setQuestions(response.data);
      } catch (err) {
        setError('Failed to fetch questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category]);

  // Handle when user selects an answer for the current question
  const handleAnswerSelect = (answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer // Save answer for the current question
    }));
  };

  // Calculate the final score based on user's answers
  const calculateScore = () => {
    let totalScore = 0;

    questions.forEach((question, index) => {
      const correctAnswers = question.correct_answers;
      const userAnswer = selectedAnswers[index];

      // Check if the user's selected answer(s) match the correct answer(s)
      if (userAnswer) {
        let isCorrect = true;
        for (const key in userAnswer) {
          if (correctAnswers[key + '_correct'] !== 'true') {
            isCorrect = false;
            break;
          }
        }
        if (isCorrect) {
          totalScore += 1; // Increment score for each correct answer
        }
      }
    });

    setScore(totalScore);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore(); // End of quiz, calculate score
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (loading) return <p className='text-center mt-30 font-serif font-bold'>Loading questions..., Please wait</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="quiz-page">
      <h1 className="text-3xl font-serif font-bold m-4 text-center">{`Quiz: ${category}`}</h1>
      {score === null ? (
        <>
          {questions.length > 0 && (
            <QuestionCard
              question={questions[currentQuestion]}
              selectedAnswer={selectedAnswers[currentQuestion]} // Pass selected answer for the current question
              onAnswerSelect={handleAnswerSelect}
            />
          )}

          <div className="navigation-button flex justify-start gap-10 ml-4 text-black">
            <Button className="bg-sky-200" onClick={handlePrev} disabled={currentQuestion === 0}>
              Previous
            </Button>
            <Button
            className="bg-sky-200"
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1 && score !== null}
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
            </Button>
          </div>
        </>
      ) : (
        <div className="score-section">
          <h1 className="text-4xl text-center font-serif">You have completed the Quiz</h1>
          <h1 className="text-2xl text-center mt-10"> Here's Your Score</h1>
          <h2 className="text-2xl text-center mt-10">Your Score: {score} / {questions.length}</h2>
          <Button className="mt-10 text-center" onClick={() => window.location.reload()}>Restart Quiz</Button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
