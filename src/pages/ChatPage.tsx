import React, { useMemo } from "react";
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

  const queryKey = useMemo(() => ["chats", chatId], [chatId]);

  const { isLoading, data, error } = useQuery(queryKey, {
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

    enabled: !!user && !!chatId,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    retry: 2, // Only retry failed requests twice
  });

  // Memoize chat messages to prevent re-rendering when data hasn't changed
  const chatMessages = useMemo(() => {
    if (!data?.chat?.history) return null;
    
    return data.chat.history.map(
      (chat: { parts: { text: string }[]; role: string }, i: React.Key) => (
        <div
          className={chat.role === "user" ? "message user" : "message"}
          key={i}
        >
          <Markdown>{chat?.parts[0]?.text}</Markdown>
        </div>
      )
    );
  }, [data?.chat?.history]);

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
                : chatMessages}
            {/* Uncomment the following lines if you want to display chat history */}
            {/*
                // : data?.chat?.history?.map(
                //     (
                //       chat: { parts: { text: string }[]; role: string },
                //       i: React.Key
                //     ) => (
                //       <div
                //         className={
                //           chat.role === "user" ? "message user" : "message"
                //         }
                //         key={i}
                //       >
                //         <Markdown>{chat?.parts[0]?.text}</Markdown>
                //       </div>
                //     )
                //   )}
            */}

            {data && <NewPrompt data={data} />}
          </div>
        </div>
      </div>
    </main>
  );
}

export default React.memo(ChatPage);
