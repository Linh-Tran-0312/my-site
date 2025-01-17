import { HashRouter as Router, Route, Routes } from "react-router-dom";
import PortfolioPage from "./pages/portfolio";
// import TerminalPage from "./pages/terminal";
import './style.css';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          {/* <Route path="/portfolio" element={<PortfolioPage />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
