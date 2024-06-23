import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    setQuizzes(quizzes);
  }, []);

  return (
    <div>
      <p className="text-2xl font-bold my-4 text-center">Available Quizzes</p>
      {quizzes.map((quiz, index) => (
        <div
          key={index}
          className="m-4 p-4 border border-gray-300 rounded flex items-center justify-between"
        >
          <p className="text-lg font-bold">{quiz.title}</p>
          <Link to={`/quiz/${index}`}>
            <button className="bg-blue-500 text-white px-2 rounded">
              Start
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
