import type { RootState } from "app/store";
import { Workout } from "types/types";

export const createMockUser = (overrides = {}) => ({
    email: "test@gmail.com",
    firstName: "John",
    lastName: "Doe",
    ...overrides,
});

export const createMockUserState = (userOverrides = {}, stateOverrides = {}) => ({
    user: createMockUser(userOverrides),
    isError: false,
    isSuccess: true,
    isLoading: false,
    message: "",
    ...stateOverrides,
});

export const createMockWorkout = (overrides= {}) => ({
    _id: "mock-id",
  title: "Bench Press",
  load: 180,
  reps: 12,
  sets: 3,
  controlled: true,
  duration: 20,
  activity: "Weightlifting (vigorous effort)",
  currentWeight: 180,
  user_id: "user-id",
  createdAt: new Date().toISOString(),
  ...overrides,
});

export const createMockWorkoutState = (workouts: Workout[] = []) => ({
  workout: workouts,
});

export const createMockAppState = (overrides: Partial<RootState> = {}): Partial<RootState> => ({
    user: createMockUserState(),
    workout: createMockWorkoutState(),
    ...overrides,
});