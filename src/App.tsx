import { BrowserRouter, Route, Routes, HashRouter as Router } from "react-router-dom";

import "./App.css";
import PortfolioPage from "./pages/portfolio";
import TerminalPage from "./pages/terminal";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TerminalPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
