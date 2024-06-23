import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResultPage = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [correctIndex, setCorrectIndex] = useState([]);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const savedState = JSON.parse(localStorage.getItem(`quizState-${quizId}`));
    const completedQuiz = savedState || {
      selectedQuiz: quizzes[quizId],
      answers: {},
      showResults: true,
    };

    setQuiz(completedQuiz.selectedQuiz);
    setAnswers(completedQuiz.answers);
    setCorrectIndex(completedQuiz.selectedQuiz.questions);
  }, [quizId]);

  useEffect(() => {
    const correctAnswers = correctIndex.reduce((acc, question, qIndex) => {
      return answers[qIndex] === parseInt(question.correctIndex)
        ? acc + 1
        : acc;
    }, 0);

    setScore(correctAnswers);
  }, [answers]);

  if (!quiz) return <div>Loading...</div>;

  function returnHome() {
    localStorage.removeItem(`quizState-${quizId}`);
    setQuiz(null);
    setAnswers({});
    setCorrectIndex([]);
    setScore(0);
    navigate("/");
  }

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-xl text-center font-bold mb-4">
        Quiz Result: {quiz.title}
      </h3>
      <div className="border-2 border-blue-500 rounded p-5">
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex} className="mb-4">
            <p className="font-semibold mb-2">
              Question {qIndex + 1}: {question.text}
            </p>
            {question.options.map((option, oIndex) => (
              <div
                key={oIndex}
                className={`flex items-center mb-2 ${
                  answers[qIndex] == oIndex
                    ? question.correctIndex == oIndex
                      ? "text-green-500"
                      : "text-red-500"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  value={oIndex}
                  checked={answers[qIndex] === oIndex}
                />
                <label>{option}</label>
              </div>
            ))}
            {answers[qIndex] !== undefined && (
              <div>
                {answers[qIndex] == question.correctIndex ? (
                  <p className="text-green-500">Correct</p>
                ) : (
                  <p className="text-red-500">
                    Incorrect, correct answer:{" "}
                    {question.options[question.correctIndex]}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h4 className="text-xl font-bold my-4">
          Your Score: {score} / {quiz.questions.length}
        </h4>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={returnHome}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
