import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "../src/App";

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

it("While user is signed in, create a new workout", async () => {
  const queryClient = new QueryClient();

  const MockApp = () => {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    );
  };

  render(<MockApp />);

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
