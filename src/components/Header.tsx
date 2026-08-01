import { NavLink } from 'react-router';
import './Header.css';

function Header() {
  return (
    <>
      <div className="header">
        <div className="nav-left">
          <NavLink className="project-name" to="/">
            Recipe Finder
          </NavLink>
          <div className="api-credit">
            Powered by TheMealDB
          </div>
        </div>
        <div className="nav-right">
          Saved Recipes & Login
        </div>
      </div>
    </>
  );
}

export default Header;