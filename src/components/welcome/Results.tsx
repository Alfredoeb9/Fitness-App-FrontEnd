import { Box, Container } from "@mui/material";
import React from "react";
import FitnessImage2 from "../../assets/fitness-image-2.jpg"
import "./Results.css";

export default function Results() {
  return (
    <div id="results">
      <Container className="results-container" component={"section"}>
        <div>
          <p>Get Results</p>

          <h2>Tracking workouts works, here's the proof</h2>

          <div className="results_gallery">
            <Box className="results_gallery-img-container">
              <img src={FitnessImage2} />
            </Box>
            <Container className="results_gallery-testimonial">
              <div>
                <div>
                  <p>
                    "The biggest realization is that I can do better. It is
                    actually possible to eat healthy, and the food can taste
                    good. "
                  </p>
                  <p>Quincy D.</p>
                </div>
              </div>
            </Container>
            <Box className="results_gallery-img-container">
              <img src={FitnessImage2} />
            </Box>
          </div>
        </div>
      </Container>
    </div>
  );
}
