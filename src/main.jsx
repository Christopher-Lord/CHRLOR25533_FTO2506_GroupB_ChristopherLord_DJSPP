import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AudioPlayerProvider } from "./context/AudioPlayerContext.jsx";
import { FavouritesProvider } from "./context/FavouritesContext.jsx";
import { ListeningHistoryProvider } from "./context/ListeningHistoryContext.jsx";

/**
 * Mounts the "App" React component to the DOM element with the ID "root"
 */
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ListeningHistoryProvider>
      <AudioPlayerProvider>
        <FavouritesProvider>
          <App />
        </FavouritesProvider>
      </AudioPlayerProvider>
    </ListeningHistoryProvider>
  </BrowserRouter>,
);
