import { cleanup } from "@testing-library/react";

afterEach(() => {
  console.log("2 - beforeEach");
  cleanup();
});
