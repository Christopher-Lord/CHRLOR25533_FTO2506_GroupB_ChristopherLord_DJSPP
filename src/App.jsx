import { Route, Routes } from "react-router-dom";
import { PodcastProvider } from "./context/PodcastContext.jsx";
import Header from "./components/UI/Header.jsx";
import Home from "./pages/Home.jsx";
import ShowDetails from "./pages/ShowDetails.jsx";
import "./App.css";

/**
 * Main app component
 *
 * Builds main application UI and defines page routes
 *
 * @returns {JSX.Element} The rendered application UI
 */
export default function App() {
  return (
    <>
      <Header />
      <PodcastProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/show/:id`} element={<ShowDetails />} />
        </Routes>
      </PodcastProvider>
    </>
  );
}
