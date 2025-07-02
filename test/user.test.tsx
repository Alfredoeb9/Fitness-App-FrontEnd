import "@testing-library/jest-dom";
import React from "react";
import { screen } from "@testing-library/react";
import App from "../src/App";
import { renderWithProviders } from "./utils/test-utils";

beforeEach(() => {
  let json = {
    email: "test@gmail",
    firstName: "test",
    lastName: "tester",
  };
  localStorage.setItem("user", JSON.stringify(json));
});

it("if user is signed in then redirect workout page", async () => {
  renderWithProviders(<App />, {
    preloadedState: {
      user: {
        user: {
          email: "test@gmail",
          firstName: "test",
          lastName: "tester",
        },
        isError: false,
        isSuccess: true,
        isLoading: false,
        message: "USER_SIGNED_IN",
      },
      workout: {
        workout: [],
      },
    },
  });

  // get user from localstorage
  const user = JSON.parse(localStorage.getItem("user"));

  expect(user).toStrictEqual({
    email: "test@gmail",
    firstName: "test",
    lastName: "tester",
  });

  const workoutScreen = screen.getByText(
    new RegExp("Put Some new Workouts")
  ).outerHTML;

  const expectedButton = "<p> Put Some new Workouts</p>";

  expect(workoutScreen).toEqual(expectedButton);
});
