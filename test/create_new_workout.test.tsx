import "@testing-library/jest-dom";
import React from "react";
import { screen, act, fireEvent } from "@testing-library/react";
import App from "../src/App";
import { renderWithProviders } from "./utils/test-utils";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve({
        _id: "1",
        title: "Bench Press",
        load: 180,
        reps: 12,
        sets: 3,
        controlled: true,
        duration: 20,
        createdAt: "2021-09-29T00:00:00.000Z",
        activity: "Weightlifting (vigorous effort)",
        currentWeight: 180,
        user_id: "1",
      }),
  })
) as jest.Mock;

beforeEach(() => {
  let json = {
    email: "test@gmail",
    firstName: "test",
    lastName: "tester",
  };
  localStorage.setItem("user", JSON.stringify(json));

  (fetch as jest.Mock).mockClear();
});

it("While user is signed in, create a new workout", async () => {
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

  const user = JSON.parse(localStorage.getItem("user"));

  expect(user).toStrictEqual({
    email: "test@gmail",
    firstName: "test",
    lastName: "tester",
  });

  const titleInput = screen.getByLabelText("title");
  const loadInput = screen.getByLabelText("load");
  const repsInput = screen.getByLabelText("reps");
  const setsInput = screen.getByLabelText("sets");

  const addWorkoutBtn = screen.getByText(new RegExp("Add Workout", "i"));

  fireEvent.change(titleInput, {
    target: {
      value: "Bench Press",
    },
  });

  fireEvent.change(loadInput, {
    target: {
      value: "180",
    },
  });

  fireEvent.change(repsInput, {
    target: {
      value: "12",
    },
  });

  fireEvent.change(setsInput, {
    target: {
      value: "3",
    },
  });

  await act(async () => {
    fireEvent.click(addWorkoutBtn);
  });

  const toastMessage = screen.getByText(new RegExp("New Workout Created", "i"));
  expect(toastMessage.innerHTML).toStrictEqual("New Workout Created");
});
