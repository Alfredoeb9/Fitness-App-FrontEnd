import React from "react";
import { Link } from "react-router-dom";
import "./chatList.css";

export default function ChatList() {
  return (
    <div className="workout_buddy-nav">
      <span className="workout_buddy-title">DASHBOARD</span>
      <Link to="/workout-buddy">Create a new Chat</Link>

      <hr />

      <div className="workout_buddy-list">
        <Link to="/workout-buddy/chat/123">My chat title</Link>
        {/* <Link to="/workout-buddy/chat/123">My chat title</Link> */}
      </div>
    </div>
  );
}
