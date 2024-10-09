import React from "react";
import "./newPrompt.css";

function NewPrompt() {
  return (
    <>
      <form className="newForm">
        {/* <label htmlFor=""></label> */}
        <input type="text" placeholder="Type a message" />
        <button>Send</button>
      </form>
    </>
  );
}

export default NewPrompt;
