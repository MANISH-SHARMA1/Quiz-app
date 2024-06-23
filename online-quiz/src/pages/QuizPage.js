import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const savedState = JSON.parse(localStorage.getItem(`quizState-${quizId}`));
    if (savedState) {
      setQuiz(savedState.selectedQuiz);
      setAnswers(savedState.answers);
      setShowResults(savedState.showResults);
    } else {
      setQuiz(quizzes[quizId]);
    }
  }, [quizId]);

  useEffect(() => {
    if (quiz) {
      const quizState = { selectedQuiz: quiz, answers, showResults };
      localStorage.setItem(`quizState-${quizId}`, JSON.stringify(quizState));
    }
  }, [quiz, answers, showResults, quizId]);

  const handleAnswerChange = (qIndex, oIndex) => {
    setAnswers({ ...answers, [qIndex]: oIndex });
  };

  const submitQuiz = () => {
    setShowResults(true);
    navigate(`/result/${quizId}`);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-xl font-bold mb-4 text-center">{quiz.title}</h3>
      {quiz.questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-4">
          <p className="font-semibold mb-1">
            Question {qIndex + 1}: {question.text}
          </p>
          {question.options.map((option, oIndex) => (
            <div key={oIndex} className="flex items-center mb-2">
              <input
                type="radio"
                name={`question-${qIndex}`}
                value={oIndex}
                onChange={() => handleAnswerChange(qIndex, oIndex)}
                className="mr-2"
                checked={answers[qIndex] === oIndex}
                disabled={showResults}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <div className="text-center">
        <button
          onClick={submitQuiz}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
