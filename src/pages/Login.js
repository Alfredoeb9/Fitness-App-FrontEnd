import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLogin } from "../hooks/useLogin";
import { userAuthSlice, selectUserAuth } from "../app/features/AuthContext";
import { handleRedirect } from "../utils/helperAuthentication";

function Login() {
  const user = useSelector(selectUserAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login2, error, isLoading } = useLogin();

  useEffect(() => {
    if (user !== null) {
      handleRedirect(user);
    }
  }, [user]);

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
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button onClick={handleSubmit} disabled={isLoading}>
        Log in
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Login;
