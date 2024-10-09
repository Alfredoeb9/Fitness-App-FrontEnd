import React, { useEffect, useRef } from "react";
import ChatList from "../components/WorkoutBuddy/ChatList";
import "./ChatPage.css";
import NewPrompt from "../components/WorkoutBuddy/NewPrompt";

function ChatPage() {
  return (
    <main className="chatPage_container">
      <div className="menu">
        <ChatList />
      </div>
      <div className="chatPage">
        <div className="wrapper">
          <div className="chat">
            <div className="message"> Test Message</div>
            <div className="message user"> Test Message from user</div>
            <div className="message"> Test Message</div>
            <div className="message user"> Test Message from user</div>
            <div className="message"> Test Message</div>
            <div className="message user"> Test Message from user</div>
            <div className="message"> Test Message</div>
            <div className="message user"> Test Message from user</div>
            <div className="message"> Test Message</div>
            <div className="message user"> Test Message from user</div>
            <div className="message"> Test Message</div>
            <div className="message user"> Test Message from user</div>
            <div className="message"> Test Message</div>
            <div className="message user"> Test Message from user</div>
            <div className="message"> Test Message</div>
            <div className="message user"> Test Message from user</div>
            <div className="message"> Test Message</div>
            <div className="message user"> Test Message from user</div>
            <div className="message"> Test Message</div>
            <div className="message user"> Test Message from user</div>

            <NewPrompt />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ChatPage;
