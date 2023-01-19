import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useLogout } from "../hooks/useLogout";
import { selectUserAuth } from "../app/features/AuthContext";

const Navbar = () => {
  const user = useSelector(selectUserAuth);
  const { logout2 } = useLogout();

  const handleClick = () => {
    logout2();
  };

  return (
    <header className="nav">
      <div className="nav_container">
        <Link to={"/"}>
          <h1>
            <span className="title_span">A1</span> Fitness Log
            <span className="title_span">ger</span>
          </h1>
        </Link>

        <nav>
          {user ? (
            <div>
              {/* <span>{user && user.email}</span> */}
              <Avatar sx={{ bgcolor: deepOrange[500] }}>
                {user.email.charAt(0)}
                <Select
                  labelId="profile-dropDown"
                  // id="demo-simple-select"
                  // value={age}
                  label="profile-dropDown"
                  // onChange={handleChange}
                >
                  <MenuItem>
                    <Link to="/profile">
                      <Avatar sx={{ bgcolor: deepOrange[500] }}></Avatar>
                      <span className="">{user && user.email}</span>
                    </Link>
                  </MenuItem>
                  <MenuItem></MenuItem>
                  <MenuItem>
                    <span onClick={handleClick}>Log out</span>
                  </MenuItem>
                </Select>
              </Avatar>
            </div>
          ) : (
            <div>
              <Link to="/login">login</Link>
              <Link to="/signup">signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
