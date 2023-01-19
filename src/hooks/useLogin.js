import { useState } from "react";
import { useDispatch } from "react-redux";
import { userAuthSlice, login } from "../app/features/AuthContext";

export const useLogin = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login2 = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `https://a1fitness-app-frontend.herokuapp.com/api/user/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.log("this ran");
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // save to localStorage
      console.log("the ok ran");
      localStorage.setItem("user", JSON.stringify(json));
      dispatch(login(json));
      setIsLoading(false);
    }
  };

  return { login2, error, isLoading };
};
