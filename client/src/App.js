import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginForm from "./components/auth/LoginForm";
import Register from "./components/auth/Register";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./components/dashboard/Dashboard";
import { AuthGuard } from "./components/common/RouteGuards";
import SideNav from "./components/navigation/side-nav/SideNav";
import Logout from "./components/auth/Logout";

function App() {
  return (
    <AuthProvider>
      <SideNav />

      <Routes>
        <Route element={<AuthGuard />}>
          <Route path="/" element={<Dashboard />} />
        </Route>

        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register step={2} />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
