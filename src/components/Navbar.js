import "./Navbar.css";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout2 } = useLogout();

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
