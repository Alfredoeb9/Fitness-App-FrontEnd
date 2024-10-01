import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import { render, screen, act, waitFor } from "@testing-library/react";
import App from "../src/App";

it("login page should have email and password as input fields with a button that says log in", async () => {
  const MockApp = () => {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  };
  await act(() => render(<MockApp />));

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
