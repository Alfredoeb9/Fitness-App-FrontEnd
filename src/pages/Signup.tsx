import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useSignup } from "../hooks/useSignup";
import { selectUserAuth } from "../app/features/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { signup, error, isLoading } = useSignup();
  const user = useSelector(selectUserAuth);

  useEffect(() => {
    if (user !== null) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    await signup(data);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <label>First Name:</label>
      <input
        type="name"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />

      <label>Last Name:</label>
      <input
        type="name"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />

      <button disabled={isLoading}>Sign Up</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Signup;
