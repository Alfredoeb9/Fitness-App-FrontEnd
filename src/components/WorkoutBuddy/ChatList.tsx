import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useAppSelector } from "../../app/hooks";
import { selectUserAuth } from "../../app/features/AuthContext";
import "./chatList.css";

export default function ChatList() {
  const user = useAppSelector(selectUserAuth);

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
              <Link key={chat._id} to={`/workout-buddy/chat/${chat._id}`}>
                {chat.title}
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
