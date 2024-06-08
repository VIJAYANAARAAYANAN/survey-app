// src/components/Survey.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Survey = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      const response = await axios.get(`http://localhost:5000/surveys/${id}`);
      setSurvey(response.data);
    };
    fetchSurvey();
  }, [id]);

  if (!survey) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{survey.title}</h1>
      {survey.questions.map((question, index) => (
        <div key={index}>
          <p>{question}</p>
          <input type="text" placeholder="Your Answer" />
        </div>
      ))}
    </div>
  );
};

export default Survey;
