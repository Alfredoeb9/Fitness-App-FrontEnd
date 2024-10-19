import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectUserAuth } from "../../app/features/AuthContext";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import "./chatDashboard.css";

function ChatDashboard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const user = useAppSelector(selectUserAuth);

  const mutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/workout-buddy/chats`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ prompt: text }),
        }
      );

      const json = await response.json();

      return json;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries(["userChats"]);
      queryClient.invalidateQueries(["chats", data.chatId]);
      navigate(`/workout-buddy/chat/${data.chatId}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const text = e.currentTarget.question.value;

      if (!text) return;

      mutation.mutate(text);
    } catch (error) {
      console.log(error);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <input type="text" name="question" placeholder="Enter your message" />

          <button>Enter</button>
        </form>
      </div>
    </div>
  );
}

export default ChatDashboard;
