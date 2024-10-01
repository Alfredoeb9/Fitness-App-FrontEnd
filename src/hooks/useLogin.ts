import { useState } from "react";
import { login } from "../app/features/AuthContext";
import { useAppDispatch } from "app/hooks";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login2 = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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

  return { login2, error, isLoading };
};
