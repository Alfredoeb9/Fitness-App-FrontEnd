import React from "react";
import { renderWithProviders } from "./test-utils";
import { createMockAppState } from "./mock-factories";
import App from "App";

export const renderAppAsLoggedInUser = (userOverrides = {}, stateOverrides = {}) => {
  const mockState = createMockAppState({
    user: {
      user: { email: "test@gmail.com", firstName: "Test", lastName: "User", ...userOverrides },
      isError: false,
      isSuccess: true,
      isLoading: false,
      message: "",
    },
    ...stateOverrides,
  });

  // Set localStorage
  localStorage.setItem("user", JSON.stringify(mockState.user?.user));

  return renderWithProviders(<App />, { preloadedState: mockState });
};

export const renderAppAsLoggedOutUser = () => {
  localStorage.removeItem("user");
  return renderWithProviders(<App />);
};