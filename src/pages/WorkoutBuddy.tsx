import React from "react";
import Chat from "../components/WorkoutBuddy/ChatDashboard";
import ChatList from "../components/WorkoutBuddy/ChatList";
import "./workoutBuddy.css";

function WorkoutBuddy() {
  return (
    <main className="workout_buddy">
      <div className="workout_buddy-container">
        <div className="menu">
          <ChatList />
        </div>

        <div className="content">
          <Chat />
        </div>
      </div>
    </main>
  );
}

export default WorkoutBuddy;
