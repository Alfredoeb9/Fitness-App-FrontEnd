import { useState } from "react";
import { login } from "../app/features/AuthContext";
import { useAppDispatch } from "../app/hooks";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login2 = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
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
        return;
      }
      
      dispatch(login(json));
      setIsLoading(false);

      return json;
    } catch (error) {
      console.error('Network error:', error);
      setError('Network error - please check if the server is running');
      setIsLoading(false); 
    }    
  };

  return { login2, error, isLoading };
};
