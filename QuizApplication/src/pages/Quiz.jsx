import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionCard from '@/components/QuestionCard';
import { Button } from '@/components/ui/button';

const Quiz = () => {
  const { category } = useParams(); // Extract category from URL
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  const fetchQuestions = async () => {
    try {
      const categoryId = parseInt(category, 10); // Convert category to integer
      console.log(`Fetching questions for category: ${categoryId}`); // Log the category ID

      const response = await axios.get('https://opentdb.com/api.php', {
        params: {
          amount: 10,
          category: categoryId,
          difficulty: 'easy',
          type: 'multiple',
        },
      });

      if (response.data.response_code === 0) {
        setQuestions(response.data.results);
        setError(null); // Reset error if successful
      } else if (response.data.response_code === 1) {
        setError('No questions found for this category');
      } else {
        setError('An unexpected error occurred.');
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('No questions available for the selected category.');
      } else {
        setError('Failed to fetch questions. Please try again.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      setLoading(true); // Set loading to true when fetching new data
      fetchQuestions(); // Fetch questions if category is present
    }
  }, [category]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      const userAnswer = selectedAnswers[index];
      if (userAnswer === question.correct_answer) {
        totalScore += 1;
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

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchQuestions(); // Retry fetching questions
  };

  if (loading) return <p>Loading questions... Please wait</p>;

  if (error) {
    return (
      <div className="error-section">
        <p className="text-red-500">{error}</p>
        <Button className="bg-sky-200" onClick={handleRetry}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <h1 className="text-3xl font-serif font-bold m-4 text-center">{`Quiz`}</h1>
      {score === null ? (
        <>
          {questions.length > 0 && (
            <QuestionCard
              question={questions[currentQuestion] || {}} // Fallback to an empty object if undefined
              selectedAnswer={selectedAnswers[currentQuestion]}
              onAnswerSelect={handleAnswerSelect}
            />
          )}

          <div className="navigation-button flex justify-start gap-10 ml-4 text-black">
            <Button
              className="bg-sky-200"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
            >
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
          <h2 className="text-2xl text-center mt-10">Your Score: {score} / {questions.length}</h2>
          <div className='text-center mt-10'>
            <Button className="w-auto text-center" onClick={() => window.location.reload()}>Restart Quiz</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
