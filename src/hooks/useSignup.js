import { useState } from "react";
import { useDispatch } from "react-redux";
import { userAuthSlice, login } from "../app/features/AuthContext";

export const useSignup = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (firstName, lastName, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `https://a1fitness-app-frontend.herokuapp.com/api/user/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
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
      dispatch(login(json));
      setIsLoading(false);
    }
  };

  return { signup, error, isLoading };
};
