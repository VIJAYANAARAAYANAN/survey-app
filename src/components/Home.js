// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Survey App</h1>
      <Link to="/create-survey">Create Survey</Link>
      <br />
      <Link to="/take-survey">Take Survey</Link>
    </div>
  );
};

export default Home;
