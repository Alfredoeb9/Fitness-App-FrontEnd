import "@testing-library/jest-dom";
import React from "react";
import { screen, fireEvent, within } from "@testing-library/react";
import App from "../src/App";
import { renderWithProviders } from "./utils/test-utils";

describe("test", () => {
  beforeEach(() => {
    let json = {
      email: "test@gmail",
      firstName: "test",
      lastName: "tester",
    };
    localStorage.setItem("user", JSON.stringify(json));
  });

  test("if user is signed in then log out button should appear within navbar dropdown", async () => {
    renderWithProviders(<App />);

    // get user from localstorage
    const user = JSON.parse(localStorage.getItem("user"));

    expect(user).toStrictEqual({
      email: "test@gmail",
      firstName: "test",
      lastName: "tester",
    });

    const profileBtn = screen.getAllByRole("combobox");

    fireEvent.change(profileBtn[0]);

    const selectNavElement = screen.getByTestId("testing");

    const button = within(selectNavElement).getByRole("combobox");

    fireEvent.mouseDown(button);

    // screen.debug(undefined, Infinity);

    const listbox = within(screen.getByRole("presentation")).getByRole(
      "listbox"
    );

    const options = within(listbox).getAllByRole("option");

    const optionValues = options.map((li) => li.getAttribute("data-value"));

    expect(optionValues).toEqual(["profile-page", "log-out"]);

    // fireEvent.click(options[1]);
    // expect(spyOnSelectChange).toHaveBeenCalledWith("log-out");
  });
});
