import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../app/features/AuthContext";

type UpdateProfileTypes = {
  firstName: string;
  lastName: string;
  email: string;
  user: {
    token?: string;
  };
};

export const useUpdateProfile = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const updateProfile = async ({
    firstName,
    lastName,
    email,
    user,
  }: UpdateProfileTypes) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/updateuser`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user?.token}`,
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
