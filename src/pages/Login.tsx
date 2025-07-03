import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { selectUserAuth } from "../app/features/AuthContext";
import { useAppSelector } from "../app/hooks";
import InfoIcon from "@mui/icons-material/Info";

function Login() {
  const navigate = useNavigate();
  const user = useAppSelector(selectUserAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login2, error, isLoading } = useLogin();
  const [show, setShow] = useState({ password: false});

  useEffect(() => {
    if (user !== null) {
      navigate("/", { replace: true });
    }
  }, [redirect, user]);

  const handleSubmit = async (e: React.FormEvent) => {
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

      <label htmlFor="password-input">Password:</label>
      <div className="input_Group">
        <input
          id="password-input"
          type={`${show.password ? "text" : "password"}`}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          aria-label="password"
        />
        <span
          onClick={() => setShow({ ...show, password: !show.password })}
        >
          <InfoIcon fontSize="large" />
        </span>
      </div>

      <button
        type="button"
        role="button"
        aria-label="log in"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        Log in
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Login;
