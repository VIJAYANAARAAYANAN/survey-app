import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import CreateSurvey from "./components/CreateSurvey";
import TakeSurvey from "./components/TakeSurvey";
import Survey from "./components/survey";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/create-survey" element={<CreateSurvey />} />
        <Route path="/take-survey" element={<TakeSurvey />} />
        <Route path="/survey/:id" element={<Survey />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/register"
          element={<Register onRegister={handleLogin} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
