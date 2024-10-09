import React, { useEffect, useRef } from "react";
import "./newPrompt.css";

function NewPrompt() {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <>
      <div className="endChat" ref={endRef}></div>
      <form className="newForm">
        {/* <label htmlFor=""></label> */}
        <input type="text" placeholder="Type a message" />
        <button>Send</button>
      </form>
    </>
  );
}

export default NewPrompt;
