import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, updateUser } from "../app/features/AuthContext";

export const useUpdateProfile = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const updateProfile = async (firstName, lastName, email, user) => {
    setIsLoading(true);
    setError(null);
    console.log(firstName, lastName, email);

    const response = await fetch(
      `https://a1fitness-app-frontend.herokuapp.com/api/user/updateuser`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "PUT",
        },
        body: JSON.stringify({ firstName, lastName, email }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // save to localStorage

      localStorage.setItem("user", JSON.stringify(json));
      dispatch(updateUser(json));
      setIsLoading(false);
    }
  };

  return { updateProfile, error, isLoading };
};
