import '@testing-library/jest-dom'
import React from 'react';
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import { render, screen, act } from '@testing-library/react'
import Login from '../src/pages/Login';
import App from '../src/App';


it('login page should have email and password as input fields', async () => {
    
    const MockApp = () => {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
    await act(() => render(<MockApp />)) 

    const emailInput = screen.getByLabelText(new RegExp('email'), 'i')

    expect(emailInput.value).toBe('');

    const passwordInput = screen.getByLabelText(new RegExp('password'), 'i')

    expect(passwordInput.value).toBe('');
    
    // const loginText = screen.getAllByText("Log In");

    // loginText.map((login) => {
    //     expect(login.textContent).toContain("Log In")
    // });
});