import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useAppSelector } from "../../app/hooks";
import { selectUserAuth } from "../../app/features/AuthContext";
import { TrashIcon } from "../../assets/svg/TrashIcon"
import "./chatList.css";

export default function ChatList() {
  const user = useAppSelector(selectUserAuth);
  const queryClient = useQueryClient(); // Add this hook

  const { isLoading, data, error } = useQuery(["userChats"], {
    queryFn: async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/workout-buddy/userchats`,
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

    enabled: !!user,
  });

  const handleDeleteChat = async (chatId: string) => {
    if (window.confirm("Are you sure you want to delete this chat?")) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/workout-buddy/deletechat/${chatId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete chat");
        }

        await queryClient.invalidateQueries(["userChats"]);
      } catch (error) {
        console.error("Error deleting chat:", error);
      }
    }
  };

  return (
    <div className="workout_buddy-nav">
      <span className="workout_buddy-title">DASHBOARD</span>
      <Link to="/workout-buddy">Create a new Chat</Link>

      <hr />

      <div className="workout_buddy-list">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {data?.chats?.map((chat: { _id: React.Key; title: string }) => (

              <div className="workout_buddy-chat" key={chat._id}>
                <Link className="workout_buddy-link" to={`/workout-buddy/chat/${chat._id}`}>
                  {chat.title}
                </Link>

                <TrashIcon
                  className="workout_buddy-delete"
                  onClick={() => handleDeleteChat(String(chat._id))}
                />
              </div>
              
            ))}
          </>
        )}
      </div>
    </div>
  );
}
