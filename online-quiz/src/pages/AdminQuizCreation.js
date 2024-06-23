import React, { useState } from "react";

const AdminQuizCreation = () => {
  const [quiz, setQuiz] = useState({ title: "", questions: [] });
  const [question, setQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    correctIndex: 0,
  });

  const addQuestion = () => {
    setQuiz({ ...quiz, questions: [...quiz.questions, question] });
    setQuestion({ text: "", options: ["", "", "", ""], correctIndex: 0 });
  };

  const saveQuiz = () => {
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    quizzes.push(quiz);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    console.log(quiz);
    setQuiz({ title: "", questions: [] });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Quiz</h2>
      <input
        type="text"
        value={quiz.title}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        placeholder="Quiz Title"
        className="block w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <div>
        <input
          type="text"
          value={question.text}
          onChange={(e) => setQuestion({ ...question, text: e.target.value })}
          placeholder="Question"
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        />
        {question.options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => {
              const options = [...question.options];
              options[index] = e.target.value;
              setQuestion({ ...question, options });
            }}
            placeholder={`Option ${index + 1}`}
            className="block w-full mb-2 p-2 border border-gray-300 rounded"
          />
        ))}
        <select
          value={question.correctIndex}
          onChange={(e) =>
            setQuestion({ ...question, correctIndex: e.target.value })
          }
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
        >
          {question.options.map((option, index) => (
            <option key={index} value={index}>
              Correct Answer: {option}
            </option>
          ))}
        </select>
        <button
          onClick={addQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Question
        </button>
      </div>
      <button
        onClick={saveQuiz}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Quiz
      </button>
    </div>
  );
};

export default AdminQuizCreation;
