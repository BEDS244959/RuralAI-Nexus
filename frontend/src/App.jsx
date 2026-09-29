import { FarmProvider } from "./context/FarmContext";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppLayout from "./components/AppLayout";

import Dashboard from "./pages/Dashboard";
import BeforeIGrow from "./pages/BeforeIGrow";
import DuringGrowth from "./pages/DuringGrowth";
import PostHarvest from "./pages/PostHarvest";
import FoodTech from "./pages/FoodTech";
import RuralEnterprise from "./pages/RuralEnterprise";
import FinancialIntelligence from "./pages/FinancialIntelligence";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <FarmProvider>
  <BrowserRouter>

    <AppLayout>

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/before-i-grow"
            element={<BeforeIGrow />}
          />

          <Route
            path="/during-growth"
            element={<DuringGrowth />}
          />

          <Route
            path="/post-harvest"
            element={<PostHarvest />}
          />

          <Route
            path="/foodtech"
            element={<FoodTech />}
          />

          <Route
            path="/rural-enterprise"
            element={<RuralEnterprise />}
          />

          <Route
            path="/financial-intelligence"
            element={<FinancialIntelligence />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>

          </AppLayout>

  </BrowserRouter>
</FarmProvider>
  );
}