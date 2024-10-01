import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  window.document.title = "Workybooks — Not Found";

  return (
    <div className="flex h-screen justify-center items-center">
      <div>
        <Link to="/">
          <button type="button">🏡 Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
