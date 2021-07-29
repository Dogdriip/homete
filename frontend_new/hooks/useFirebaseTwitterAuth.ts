import React, { useState, useEffect } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { loginWithTwitter, logoutFromTwitter } from "../lib/auth";

const useFirebaseTwitterAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const login = async () => {
    setLoading(true);
    const result = await loginWithTwitter();
    if (result) {
      // Login succeed
    } else {
      // Logout failure
    }
    setLoading(false);
  };
  const logout = async () => {
    setLoading(true);
    await logoutFromTwitter();
    setLoading(false);
  };

  return { user, loading, login, logout };
};

export default useFirebaseTwitterAuth;
