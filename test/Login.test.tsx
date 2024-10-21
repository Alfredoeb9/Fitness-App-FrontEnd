import "@testing-library/jest-dom";
import React from "react";
import { screen } from "@testing-library/react";
import App from "../src/App";
import { renderWithProviders } from "./utils/test-utils";

it("login page should have email and password as input fields with a button that says log in", async () => {
  renderWithProviders(<App />);

  const emailInput = screen.getByLabelText(
    new RegExp("email", "i")
  ) as HTMLInputElement;

  expect(emailInput.value).toBe("");

  const passwordInput = screen.getByLabelText(
    new RegExp("password", "i")
  ) as HTMLInputElement;

  expect(passwordInput.value).toBe("");

  const loginButton = screen.getAllByText(new RegExp("Log in", "i"))[1]
    .outerHTML;

  const expectedButton =
    '<button type="button" role="button" aria-label="log in">Log in</button>';

  expect(loginButton).toEqual(expectedButton);
});
