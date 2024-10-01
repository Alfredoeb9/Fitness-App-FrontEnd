import { useState } from "react";
import { login } from "../app/features/AuthContext";
import { useAppDispatch } from "app/hooks";

type SignUpTypes = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const useSignup = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async ({
    firstName,
    lastName,
    email,
    password,
  }: SignUpTypes) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/signup`,
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
