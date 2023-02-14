import { Link,Navigate } from "react-router-dom";
import { logout } from "../modules/authManager";

export const Navbar = () => {
   return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="/">FilmSpot</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="/">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="MakeMovie">StoreMovie</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Profile</a>
      </li>
      <li className="nav-item">
                  <a  className="nav-link" onClick={logout}>Logout</a>
                </li>
    </ul>
  </div>
</nav>
   )
}