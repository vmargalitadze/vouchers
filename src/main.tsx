import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MyContextProvider } from "./Context/myContext.tsx";
import { HashRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <MyContextProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </MyContextProvider>
  </HashRouter>
);
