import '@testing-library/jest-dom'
import React from 'react';
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import { render, screen, act } from '@testing-library/react'
import App from '../src/App';

it('if no user is signed in then redirect to login page', async () => {
    const MockApp = () => {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    };

    await act(() => render(<MockApp />));

    // get user from localstorage
    const user = JSON.parse(localStorage.getItem("user"));

    expect(user).toBeNull();

    // check if we are in the login screen
    const emailInput = screen.getByLabelText(new RegExp('email'), 'i')

    expect(emailInput.value).toBe('');
})