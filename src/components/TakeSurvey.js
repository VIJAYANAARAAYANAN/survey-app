import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TakeSurvey = () => {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [surveyAnswers, setSurveyAnswers] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      const response = await axios.get("http://localhost:5000/surveys");
      setSurveys(response.data);
    };
    fetchSurveys();
  }, []);

  const handleSurveySelect = async (surveyId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/surveys/${surveyId}`
      );
      setSelectedSurvey(response.data);
      setSurveyAnswers(new Array(response.data.questions.length).fill(""));
    } catch (error) {
      console.error("Error fetching survey:", error);
    }
  };

  const handleAnswerChange = (index, event) => {
    const newSurveyAnswers = [...surveyAnswers];
    newSurveyAnswers[index] = event.target.value;
    setSurveyAnswers(newSurveyAnswers);
  };

  const handleSubmitSurvey = async () => {
    try {
      const response = await axios.post("http://localhost:5000/submit-survey", {
        surveyId: selectedSurvey._id,
        answers: surveyAnswers,
      });
      console.log(response.data);
      // Clearing the selected survey and answers after submission
      setSelectedSurvey(null);
      setSurveyAnswers([]);
    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  };

  return (
    <div>
      <h1>Select a Survey to Take</h1>
      {surveys.map((survey) => (
        <div key={survey._id}>
          <Link onClick={() => handleSurveySelect(survey._id)}>
            {survey.title}
          </Link>
        </div>
      ))}
      {selectedSurvey && (
        <div>
          <h2>{selectedSurvey.title}</h2>
          {selectedSurvey.questions.map((question, index) => (
            <div key={index}>
              <p>{question}</p>
              <input
                type="text"
                value={surveyAnswers[index]}
                onChange={(e) => handleAnswerChange(index, e)}
                placeholder={`Answer ${index + 1}`}
              />
            </div>
          ))}
          <button onClick={handleSubmitSurvey}>Submit Survey</button>
        </div>
      )}
    </div>
  );
};

export default TakeSurvey;
