import "./Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";
import { userAuthSlice, selectUserAuth } from "../app/features/AuthContext";

const Navbar = () => {
  const user = useSelector(selectUserAuth);
  const { logout2 } = useLogout();
  // const { user } = userAuthSlice();

  const handleClick = () => {
    logout2();
  };

  return (
    <header className="nav">
      <div className="nav_container">
        <Link to={"/"}>
          <h1>Workout Buddy</h1>
        </Link>

        <nav>
          <div>
            <span>{user && user.email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
          <div>
            <Link to="/login">login</Link>
            <Link to="/signup">signup</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
