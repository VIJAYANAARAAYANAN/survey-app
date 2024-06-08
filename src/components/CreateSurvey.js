// src/components/CreateSurvey.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateSurvey = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([""]);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:5000/create-survey", {
      title,
      questions,
    });
    console.log(response.data);
    navigation("/");
  };
  const navigation = useNavigate();

  return (
    <div>
      <h1>Create a New Survey</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Survey Title"
      />
      {questions.map((question, index) => (
        <input
          key={index}
          type="text"
          value={question}
          onChange={(e) => handleQuestionChange(index, e)}
          placeholder={`Question ${index + 1}`}
        />
      ))}
      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Submit Survey</button>
    </div>
  );
};

export default CreateSurvey;
