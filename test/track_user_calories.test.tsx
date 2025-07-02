import "@testing-library/jest-dom";
import React from "react";
import { screen, act, fireEvent } from "@testing-library/react";
import App from "../src/App";
import { renderWithProviders } from "./utils/test-utils";

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve({
        _id: "mock-id",
        title: "Bench Press",
        load: "180",
        reps: "12",
        sets: "3",
        activity: "Weightlifting (vigorous effort)",
        duration: "20",
        currentWeight: "8",
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

it("While user is signed in, creates a new workout and tracks calories", async () => {
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

  // const titleInput = screen.getByLabelText(/title/i);
  // const loadInput = screen.getByLabelText("load");
  // const repsInput = screen.getByLabelText("reps");
  // const setsInput = screen.getByLabelText("sets");

  // const controlledInput = screen.getByLabelText("controlled");
  // const durationInput = screen.getByLabelText("duration");
  // const weightInput = screen.getByLabelText("weight");
  // const workoutDropdown = screen.getByLabelText("workout-dropdown");
  const weightOption = screen.getByLabelText("Weightlifting (vigorous effort)");

  // const addWorkoutBtn = screen.getByText(new RegExp("Add Workout", "i"));
  const titleInput = 
    screen.getByLabelText(/title/i) || 
    screen.getByPlaceholderText(/title/i) ||
    screen.getByDisplayValue("") || // If it has a default value
    screen.getByRole("textbox", { name: /title/i });

  const loadInput = 
    screen.getByLabelText(/load/i) || 
    screen.getByPlaceholderText(/load/i);

  const repsInput = 
    screen.getByLabelText(/reps/i) || 
    screen.getByPlaceholderText(/reps/i);

  const setsInput = 
    screen.getByLabelText(/sets/i) || 
    screen.getByPlaceholderText(/sets/i);

  const controlledInput = 
    screen.getByLabelText(/controlled/i) || 
    screen.getByRole("checkbox");

  const durationInput = 
    screen.getByLabelText(/duration/i) || 
    screen.getByPlaceholderText(/duration/i);

  const weightInput = 
    screen.getByLabelText("weight") || 
    screen.getByPlaceholderText("weight");

  const workoutDropdown = 
    screen.getByLabelText(/workout/i) || 
    screen.getByRole("combobox");

  const addWorkoutBtn = screen.getByRole("button", { name: /add workout/i });

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

  fireEvent.click(controlledInput);

  fireEvent.change(workoutDropdown, {
    target: { value: "Weightlifting (vigorous effort)" },
  });

  expect((weightOption as HTMLOptionElement).selected).toBeTruthy();

  fireEvent.change(durationInput, { target: { value: "20" } });

  fireEvent.change(weightInput, { target: { value: "8" } });

  await act(async () => {
    fireEvent.click(addWorkoutBtn);
  });

  const toastMessage = screen.getByText(new RegExp("New Workout Created", "i"));
  expect(toastMessage.innerHTML).toStrictEqual("New Workout Created");

  expect(fetch).toHaveBeenCalledTimes(1);
});
