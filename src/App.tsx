import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/public-modules/login/login";
import Dashboard from "./components/private-modules/dashboard/dashboard";
import { AuthProvider } from "./context/auth-context/auth-context";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/inicio" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
