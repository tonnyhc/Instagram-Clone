import { Routes, Route } from "react-router-dom";

import LoginForm from "./components/auth/LoginForm";
import Register from "./components/auth/Register";
import { AuthGuard } from "./components/common/RouteGuards";
import SideNav from "./components/navigation/side-nav/SideNav";
import Logout from "./components/auth/Logout";
import Profile from "./components/profile/Profile";
import ProfileSettings from "./components/profile/profile-settings/ProfileSettings";

import styles from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLogedInProfile } from "./services/profileServices";
import { userProfileActions } from "./store/user-profile-slice";
import { authActions } from "./store/auth-slice";

function App() {
  const authState = useSelector((state) => state.auth);
  const isAuth = authState.isAuth || false;
  const authUserData = authState.authUserData;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth) {
      return;
    }

    (async () => {
      try {
        const data = await fetchLogedInProfile();
        dispatch(userProfileActions.setInitalData(data));
      } catch (e) {
        dispatch(authActions.userLogout());
         
      }
    })();
  }, []);

  return (
    <>
      {isAuth && (
        <>
          <SideNav />
          <main className={styles.mainPart}>
            <Routes>
              <Route element={<AuthGuard />}>
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<h1>Hello</h1>} />
                <Route path="/accounts/*" element={<ProfileSettings />} />
              </Route>
              {!authUserData.is_confirmed && (
                <Route path="/register" element={<Register />} />
              )}
              <Route path="/p/:username" element={<Profile />} />
            </Routes>
          </main>
        </>
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
