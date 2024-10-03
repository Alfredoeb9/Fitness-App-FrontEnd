import React from "react";
import Box from "@mui/material/Box";
import phoneStats from "../../../public/assets/fitness-phone-stats.jpg";
import FlagIcon from "@mui/icons-material/Flag";
import "./ApplicationInfo.css";

export default function ApplicationInfo() {
  return (
    <section className="application_info">
      <div id="how_it-works">
        <span>
          <FlagIcon color="primary" fontSize="large" />
        </span>

        <h2>Hit your health goals in 1-2-3</h2>

        <Box className="application_info-box">
          <Box>
            <Box>
              <p className="application_info-num">1</p>
              <p className="application_info-heading">
                Track food, fitness & fasting
              </p>
              <p className="application_info-description">
                Tracking calories and macros is easy with our barcode scanner
                and device integration.
              </p>
            </Box>
            <span className="application_info-image-left">
              <img src={phoneStats} alt="" />
            </span>
          </Box>

          <Box id="application_info-right">
            <Box>
              <p className="application_info-num">2</p>
              <p className="application_info-heading">Learn what works</p>
              <p className="application_info-description">
                Personalized nutrition insights reveal what's working so you can
                make smarter choices.
              </p>
            </Box>

            <span className="application_info-image-left">
              <img src={phoneStats} alt="" />
            </span>
          </Box>

          <Box>
            <Box>
              <p className="application_info-num">3</p>
              <p className="application_info-heading">
                Change your habits and reach your goals
              </p>
              <p className="application_info-description">
                Now you have the tools and knowledge to build healthy habits for
                life.
              </p>
            </Box>

            <span className="application_info-image-left">
              <img src={phoneStats} alt="" />
            </span>
          </Box>
        </Box>
      </div>
    </section>
  );
}
