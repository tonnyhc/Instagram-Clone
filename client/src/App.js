import { Routes, Route } from "react-router-dom";

import LoginForm from "./components/auth/LoginForm";
import Register from "./components/auth/Register";
import { AuthDataContext } from "./contexts/AuthContext";
import { AuthGuard } from "./components/common/RouteGuards";
import SideNav from "./components/navigation/side-nav/SideNav";
import Logout from "./components/auth/Logout";
import Profile from "./components/profile/Profile";
import { useContext } from "react";
import { UserProvider } from "./contexts/ProfileContext";
import ProfileSettings from "./components/profile/profile-settings/ProfileSettings";

import styles from './App.module.css';

function App() {
  const { isAuth, authUserData } = useContext(AuthDataContext);
  return (
    <>
      {isAuth && (
        <UserProvider>
          <SideNav />
          <main className={styles.mainPart}>
            <Routes>
              <Route path="/logout" element={<Logout />} />
              <Route element={<AuthGuard />}>
                <Route path="/" element={<h1>Hello</h1>} />
                <Route path="/accounts/*" element={<ProfileSettings />} />
              </Route>
              {!authUserData.is_confirmed && (
                <Route path="/register" element={<Register />} />
              )}
              <Route path="/p/:username" element={<Profile />} />
            </Routes>
          </main>
        </UserProvider>
      )}

      {!isAuth && (
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register step={2} />} />
          <Route path="/p/:username" element={<Profile />} />
        </Routes>
      )}
    </>
  );
}

export default App;
