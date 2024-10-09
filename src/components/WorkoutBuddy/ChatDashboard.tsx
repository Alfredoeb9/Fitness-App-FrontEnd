import React from "react";
import "./chatDashboard.css";

function ChatDashboard() {
  return (
    <div className="chatDashboard">
      <div className="texts">
        <h1>Chat</h1>
        <p>Chat with your AI Trainer</p>
      </div>

      <div className="options">
        <div className="options">
          <img src="" alt="Chat AI" />
          <span>Create a New Chat</span>
        </div>
      </div>

      <div className="chatDashboard__formContainer">
        <form action="">
          <input type="text" placeholder="Enter your message" />

          <button>Enter</button>
        </form>
      </div>
    </div>
  );
}

export default ChatDashboard;
