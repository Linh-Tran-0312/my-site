import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import PortfolioPage from "./pages/portfolio";
import TerminalPage from "./pages/terminal";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TerminalPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
