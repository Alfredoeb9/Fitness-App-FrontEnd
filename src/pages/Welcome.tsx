import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="welcome">
      <div className="welcome__container">
        <h3>Track Your Exercise</h3>

        <h1>
          Track your journey,
          <br />
          See your results
        </h1>

        <p>
          Track your daily workouts and see how you are progressing throughout
          your fitness journey.
        </p>

        <div>
          <Link to="/login">Track Progress</Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
