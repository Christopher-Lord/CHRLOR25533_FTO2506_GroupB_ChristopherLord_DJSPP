import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

/**
 * Header component
 *
 * @returns {JSX.Element} Header UI
 */
export default function Header() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }

  return (
    <header className="podcast-header">
      <div className="podcast-logo">
        {theme === "light" ? (
          <img src="/src/assets/podcast-logo-light.png" alt="Podcast Logo" />
        ) : (
          <img src="/src/assets/podcast-logo-dark.png" alt="Podcast Logo" />
        )}
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
      <div className="theme-switch" onClick={toggleTheme}>
        <span>{theme === "light" ? "🌙" : "☀️"}</span>
      </div>
    </header>
  );
}
