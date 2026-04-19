import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import { Auth } from "./pages/Auth";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </Router>
  );
}
