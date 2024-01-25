/** @jest-environment jsdom */
import '@testing-library/jest-dom'
import React from 'react';
import { Provider } from "react-redux";
import { store } from "../app/store";
import { render, screen } from '@testing-library/react'
import Login from '../pages/Login';


it('login page should have email and password', () => {
    
    render(
        <Provider store={store}>
            <Login />
        </Provider>
    );

    const loginText = screen.getAllByText("Log In");

    loginText.map((login) => {
        expect(login.textContent).toContain("Log In")
    });
});