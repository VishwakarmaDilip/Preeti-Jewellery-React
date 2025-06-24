import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    {screen.width < 640 ? (
      <Toaster position="top-right" />
    ) : (
      <Toaster position="top-center" />
    )}
  </Provider>
);
