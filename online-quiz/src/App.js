import { Route, Routes } from "react-router-dom";
import AdminQuizCreation from "./pages/AdminQuizCreation";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/quiz/:quizId" element={<QuizPage />} />
        <Route path="/result/:quizId" element={<ResultPage />} />
        <Route path="/create-quiz" element={<AdminQuizCreation />} />
      </Routes>
    </div>
  );
}

export default App;
