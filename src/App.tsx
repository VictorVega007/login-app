import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/public-modules/login/login";
import Dashboard from "./components/private-modules/dashboard/dashboard";
import { AuthProvider } from "./context/auth-context/auth-context";
import RouterGuard from "./core/guard/router-guard";
import RedirectGuard from "./core/guard/redirect-guard";
import { TooltipProvider } from "@radix-ui/react-tooltip";

function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RedirectGuard />} />
            <Route path="/inicio" element={<Login />} />
            <Route element={<RouterGuard />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
