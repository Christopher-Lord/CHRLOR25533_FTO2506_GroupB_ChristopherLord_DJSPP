import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

/**
 * Header component
 *
 * Displays the application header with:
 * - Logo that changes based on the theme
 * - Navigation links (Home, Favourites)
 * - Theme toggle switch (light/dark mode)
 *
 * Theme preference is stored in localStorage and applied to the document root.
 *
 * @returns {JSX.Element} Header UI
 */
export default function Header() {
  // State to track current theme, default is 'light'
  const [theme, setTheme] = useState("light");

  // On component mount, check if a theme is saved in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
      // Apply theme to HTML root
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  /**
   * Toggle between light and dark themes
   * Updates state, localStorage, and document root attribute
   */
  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Persist theme preference
    localStorage.setItem("theme", newTheme);
    // Update theme attribute
    document.documentElement.setAttribute("data-theme", newTheme);
  }

  return (
    <header className="podcast-header">
      
      {/* LOGO SECTION */}
      <div className="podcast-logo">

        {/* Show light or dark logo depending on current theme */}
        {theme === "light" ? (
          <img src="/podcast-logo-light.png" alt="Podcast Logo" />
        ) : (
          <img src="/podcast-logo-dark.png" alt="Podcast Logo" />
        )}
        <h1>PodcastApp</h1>
      </div>

      {/* NAVIGATION LINKS */}
      <div className="nav-links">
        <NavLink to={"/"} className="link">
          <h3>Home</h3>
        </NavLink>
        <NavLink to={"/favourites"} className="link">
          <h3>Favourites</h3>
        </NavLink>
      </div>

      {/* THEME TOGGLE SWITCH */}
      <div className="theme-switch" onClick={toggleTheme}>
        <span>{theme === "light" ? "🌙" : "☀️"}</span>
      </div>
    </header>
  );
}
