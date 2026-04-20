import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import { Auth } from "./pages/Auth";
import { PrivatePage } from "./components/PrivatePage";
import { Home } from "./pages/Home";

export function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          {/* rotas protegidas */}
          <Route element={<PrivatePage />}>
            <Route path="/dashboard/:id" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
