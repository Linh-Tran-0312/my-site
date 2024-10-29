import { HashRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import PortfolioPage from "./pages/portfolio";
import TerminalPage from "./pages/terminal";

function App() {
  return (
    <>
    <h1>hello</h1>
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
