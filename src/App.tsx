import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import { Auth } from "./pages/Auth";
import { PrivatePage } from "./components/PrivatePage";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { Cautions } from "./pages/Cautions";
import { Military } from "./pages/Military";
import { Loads } from "./pages/Loads";
import { SubArmorer } from "./pages/SubArmorer";
import { FunctionPass } from "./pages/FunctionPass";
import { LoadDetails } from "./pages/LoadDetails";

export function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          {/* rotas protegidas */}
          <Route element={<PrivatePage />}>
            <Route element={<Layout />}>
              <Route path="/dashboard/:id" element={<Home />} />
              <Route path="/cautelas/:id" element={<Cautions />} />
              <Route path="/militares/:id" element={<Military />} />
              <Route path="/cargas/:id" element={<Loads />} />
              <Route path="/cargas/:id/:loadId" element={<LoadDetails />} />
              <Route path="/sub-armeiro/:id" element={<SubArmorer />} />
              <Route path="/passagem-funcao/:id" element={<FunctionPass />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
