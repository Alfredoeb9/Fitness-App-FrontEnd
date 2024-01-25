/** @jest-environment jsdom */
import React from 'react';
import { Provider } from "react-redux";
import { store } from "../app/store";
import { render } from '@testing-library/react'
import Login from '../pages/Login';


it('login page should have email and password', () => {
    

    const App = render(
        <Provider store={store}>
            <Login />
        </Provider>
    );

    console.log("App", App.container.innerHTML)
});