import React, { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  getAdditionalUserInfo,
  UserCredential,
} from "firebase/auth";
import { loginWithTwitter, logoutFromTwitter } from "../lib/auth";
import { setUserByUserCredential } from "../lib/user";
import { User } from "../types/user";

const useFirebaseTwitterAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userCredential, setUserCredential] = useState<UserCredential | null>(
    null
  );
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && userCredential) {
        const user = await setUserByUserCredential(userCredential);
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [userCredential]);

  const login = async () => {
    setLoading(true);
    const userCredential = await loginWithTwitter();
    if (userCredential) {
      setUserCredential(userCredential);
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
