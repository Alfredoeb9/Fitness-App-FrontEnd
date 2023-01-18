import "./Navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="nav">
      <div className="nav_container">
        <Link to={"/"}>
          <h1>Workout Buddy</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar;