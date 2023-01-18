import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login2, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login2(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      {/* <div className="login"> */}
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
      {/* </div> */}
    </form>
  );
}

export default Login;
