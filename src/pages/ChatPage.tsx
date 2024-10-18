import React from "react";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { useQuery } from "react-query";
import ChatList from "../components/WorkoutBuddy/ChatList";
import { useAppSelector } from "../app/hooks";
import { selectUserAuth } from "../app/features/AuthContext";
import NewPrompt from "../components/WorkoutBuddy/NewPrompt";
import "./chatPage.css";

function ChatPage() {
  const user = useAppSelector(selectUserAuth);
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isLoading, data, error } = useQuery(["chats", chatId], {
    queryFn: async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/workout-buddy/chats/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong with retrieving your chats!");
      }

      const data = await response.json();

      return data;
    },
    // retry: 1,
    enabled: !!user,
  });

  console.log("data", data);

  return (
    <main className="chatPage_container">
      <div className="menu">
        <ChatList />
      </div>
      <div className="chatPage">
        <div className="wrapper">
          <div className="chat">
            {isLoading
              ? "Loading..."
              : error
                ? "Something went wrong"
                : data?.chat?.history?.map(
                    (
                      chat: { parts: { text: string }[]; role: string },
                      i: React.Key
                    ) => (
                      <div
                        className={
                          chat.role === "user" ? "message user" : "message"
                        }
                        key={i}
                      >
                        <Markdown>{chat?.parts[0]?.text}</Markdown>
                      </div>
                    )
                  )}

            {data && <NewPrompt data={data} />}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ChatPage;
