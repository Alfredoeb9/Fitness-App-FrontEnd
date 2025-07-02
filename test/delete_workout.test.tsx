import "@testing-library/jest-dom";
import React from "react";
import { screen, act, fireEvent } from "@testing-library/react";
import App from "../src/App";
import { renderWithProviders } from "./utils/test-utils";

const localWorkout = [
  {
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
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve(localWorkout),
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

jest.mock("react-query", () => {
  const originalModule = jest.requireActual("react-query");

  return {
    ...originalModule,
    useQuery: jest.fn(() => ({
      data: [
        {
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
        },
      ],
    })),
  };
});

it("Given a user is logged in, when the user deletes a workout, then the workout is removed from the user's workout list", async () => {
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
        workout: localWorkout 
      } 
    },
  });

  const user = JSON.parse(localStorage.getItem("user"));

  expect(user).toStrictEqual({
    email: "test@gmail",
    firstName: "test",
    lastName: "tester",
  });

  const deleteBtn = screen.getByTestId("DeleteOutlinedIcon");

  await act(async () => {
    fireEvent.click(deleteBtn);
  });

  const toastMessage = screen.getByText(new RegExp("New Workout Deleted", "i"));

  expect(toastMessage.innerHTML).toStrictEqual("New Workout Deleted");
});
