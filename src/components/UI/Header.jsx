import { NavLink } from "react-router-dom";

/**
 * Header component
 *
 * @returns {JSX.Element} Header UI
 */
export default function Header() {
  return (
    <header className="podcast-header">
      <div className="podcast-logo">
        <img src="/src/assets/podcast-logo-light.png" alt="Podcast Logo" />
        <h1>PodcastApp</h1>
      </div>
      <div className="nav-links">
        <NavLink to={"/"} className="link">
          <h3>Home</h3>
        </NavLink>
        <NavLink to={"/favourites"} className="link">
          <h3>Favourites</h3>
        </NavLink>
      </div>
    </header>
  );
}
