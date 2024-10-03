import React from "react";
import { Link } from "react-router-dom";
// import Box from "@mui/material/Box";
// import phoneStats from "../../public/assets/fitness-phone-stats.jpg";
// import FlagIcon from "@mui/icons-material/Flag";
import Banner from "../components/welcome/Banner";
import "./Welcome.css";
import Results from "../components/welcome/Results";
import ApplicationInfo from "../components/welcome/ApplicationInfo";

function Welcome() {
  return (
    <div className="welcome">
      <div className="welcome__container">
        <section className="welcome__hero-section">
          <div className="welcome__hero-container">
            <h3>Track Your Exercise</h3>

            <h1>
              Track your journey,
              <br />
              See your results
            </h1>

            <p>
              Track your daily workouts and see how you are progressing
              throughout your fitness journey.
            </p>

            <div>
              <Link to="/login">Track Progress</Link>
            </div>
          </div>
        </section>
      </div>

      <ApplicationInfo />

      <Banner />

      <Results />
    </div>
  );
}

export default Welcome;
