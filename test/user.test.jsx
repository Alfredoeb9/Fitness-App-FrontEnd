import '@testing-library/jest-dom'
import React from 'react';
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import { render, screen, act } from '@testing-library/react'
import {
    QueryClient,
    QueryClientProvider,
  } from 'react-query'
import App from '../src/App';

beforeEach(() => {
    let json = {
        "email": "test@gmail",
        "firstName": "test",
        "lastName": "tester"
    }
    localStorage.setItem("user", JSON.stringify(json))
    // dispatch(login(json));
});

it('if user is signed in then redirect workout page', async () => {
    // Create a client
    const queryClient = new QueryClient()

    const MockApp = () => {
        return (
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </Provider>
        )
    };

    await act(() => render(<MockApp />));

    // get user from localstorage
    const user = JSON.parse(localStorage.getItem("user"));


    expect(user).toStrictEqual({
        "email": "test@gmail",
        "firstName": "test",
        "lastName": "tester"
    });

    const workoutScreen = screen.getByText(new RegExp('Put Some new Workouts'), 'i').outerHTML

    const expectedButton = '<p> Put Some new Workouts</p>';

    expect(workoutScreen).toEqual(expectedButton)
})