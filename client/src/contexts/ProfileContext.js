import {
  createContext,
  useEffect,
  useState,
} from "react";

import { fetchLogedInProfile } from "../services/profileServices";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    profile_picture: "",
    username: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchLogedInProfile();
        setUserData({
          profile_picture: data.profile_picture,
          username: data.username,
          profile_id: data.id
        });
      } catch (e) {
        alert(e);
      }
    })();
  }, []);

  const context = {
    userData,
    setUserData,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};
