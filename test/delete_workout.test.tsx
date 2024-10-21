import "@testing-library/jest-dom";
import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
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

beforeEach(() => {
  let json = {
    email: "test@gmail",
    firstName: "test",
    lastName: "tester",
  };
  localStorage.setItem("user", JSON.stringify(json));
});

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve({
        data: {
          activity: "test",
          currentWeight: "160",
          duration: "20",
          load: "123",
          reps: "2",
          sets: 2,
          title: "test",
        },
      }),
    headers: new Headers(),
    redirected: false,
    statusText: "OK",
    type: "basic",
    url: "",
    clone: jest.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    text: jest.fn(),
  } as Response)
);

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
    preloadedState: { workout: { workout: localWorkout } },
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
