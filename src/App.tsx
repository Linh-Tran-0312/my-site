import { HashRouter as Router, Route, Routes } from "react-router-dom";

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
