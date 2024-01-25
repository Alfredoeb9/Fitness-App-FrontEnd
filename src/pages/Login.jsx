import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { redirect  } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { selectUserAuth } from "../app/features/AuthContext";

function Login() {
  const navigate = useNavigate();
  const user = useSelector(selectUserAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login2, error, isLoading } = useLogin();

  useEffect(() => {
    if (user !== null) {
      navigate("/", { replace: true })
    }
  }, [redirect, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login2(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Email:</label>
      <input
        type="email"
        aria-label="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        aria-label="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button type="button" role="button" aria-label="log in" onClick={handleSubmit} disabled={isLoading}>
        Log in
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Login;
