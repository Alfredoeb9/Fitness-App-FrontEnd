import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useUpdateProfile } from "../hooks/useProfileUpdate";
import { useLogout } from "../hooks/useLogout";
import { selectUserAuth } from "../app/features/AuthContext";

function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { updateProfile, error, isLoading } = useUpdateProfile();
  const user = useSelector(selectUserAuth);

  const { logout2 } = useLogout();

  useEffect(() => {
    if (user == null) {
      navigate("/login", { replace: true });
    }
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(
      firstName || user.firstName,
      lastName || user.lastName,
      email || user.email,
      user
    );
  };

  const handleLogOut = () => {
    logout2();
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Change Profile:</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email || ""}
        placeholder={user.email}
      />
      <label>First Name:</label>
      <input
        type="name"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName || ""}
        placeholder={user.firstName}
      />

      <label>Last Name:</label>
      <input
        type="name"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName || ""}
        placeholder={user.lastName}
      />

      <button disabled={isLoading}>Update Profile</button>

      <div>
        <span>
          come back later?{" "}
          <button className="logout" onClick={handleLogOut}>
            Logout
          </button>
        </span>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Profile;
