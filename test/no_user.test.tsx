import "@testing-library/jest-dom";
import React from "react";
import { screen } from "@testing-library/react";
import App from "../src/App";
import { renderWithProviders } from "./utils/test-utils";

it("if no user is signed in then redirect to login page", async () => {
  renderWithProviders(<App />);

  // get user from localstorage
  const user = JSON.parse(localStorage.getItem("user"));

  expect(user).toBeNull();

  // check if we are in the login screen
  const emailInput = screen.getByLabelText(new RegExp("email", "i"));

  expect((emailInput as HTMLInputElement).value).toBe("");
});
