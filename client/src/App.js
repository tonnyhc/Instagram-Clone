import { BrowserRouter, Routes, Route, useLoaderData } from "react-router-dom";

import LoginForm from "./components/auth/LoginForm";
import Register from "./components/auth/Register";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./components/dashboard/Dashboard";
import { AuthGuard } from "./components/common/RouteGuards";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthGuard />}>
            <Route path="/" element={<Dashboard />} />
          </Route>

          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register step={2} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
