import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div>
            <h5>About</h5>
            <p className="text-justify">
              A1 Fitness Logger is an initiative to help the upcoming weight
              lifters track calories and workout routines. A1 Fitness logger
              focuses on providing the most efficient User Interface and User
              Experience program to its' users. This application will help users
              track their workouts and how much calories they have burned during
              that workout.
            </p>
          </div>

          <div>
            <h5>Products</h5>
            <ul className="footer-links">
              <li>
                <a href="https://fitness-app-front-end-eight.vercel.app/">
                  Workout Tracker
                </a>
              </li>
              {/* <li>
                <a href="http://scanfcode.com/category/front-end-development/">
                  UI Design
                </a>
              </li>
              <li>
                <a href="http://scanfcode.com/category/back-end-development/">
                  PHP
                </a>
              </li>
              <li>
                <a href="http://scanfcode.com/category/java-programming-language/">
                  Java
                </a>
              </li>
              <li>
                <a href="http://scanfcode.com/category/android/">Android</a>
              </li>
              <li>
                <a href="http://scanfcode.com/category/templates/">Templates</a>
              </li> */}
            </ul>
          </div>

          <div>
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li>
                <a href="#">About Us</a>
              </li>
              {/* <li>
                <a href="https://fitness-app-front-end-eight.vercel.app/contact/">Contact Us</a>
              </li>
              <li>
                <a href="https://fitness-app-front-end-eight.vercel.app/contribute-at-scanfcode/">
                  Contribute
                </a>
              </li>
              <li>
                <a href="https://fitness-app-front-end-eight.vercel.app/privacy-policy/">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://fitness-app-front-end-eight.vercel.app/sitemap/">Sitemap</a>
              </li> */}
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div>
            <p className="copyright-text">
              Copyright &copy; 2020 All Rights Reserved by
              <a href="https://alfredo-dev.vercel.app/"> Alfredo Barillas</a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
