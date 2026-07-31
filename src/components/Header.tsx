import './Header.css';

function Header() {
  return (
    <>
      <div className="header">
        <div className="nav-left">
          <div className="project-name">
            Recipe Finder
          </div>
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