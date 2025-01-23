import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Auth/LogIn";
import Signup from "./components/Auth/SignUp";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/Home";
import QuestionPage from "./components/Questions/QuestionsPage.js";
import QuestionForm from "./components/Questions/QuestionForm.js";
import NameQues from "./components/Questions/NameQues.js";
import SelectedTest from "./components/Questions/SelectedTest.js";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/SignUp" element={<Signup />} />
          <Route exact path="/Home" element={<HomePage />} />
          <Route exact path="/QuestionForm" element={<QuestionForm />} />
          <Route path="/Tests" element={<NameQues />} />
          <Route exact path="/QuestionPage" element={<QuestionPage />} />
          <Route path="/Tests/:name" element={<SelectedTest />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
