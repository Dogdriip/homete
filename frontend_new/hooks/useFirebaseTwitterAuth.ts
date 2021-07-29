import React, { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  getAdditionalUserInfo,
  signInWithCredential,
  reauthenticateWithPopup,
  getRedirectResult,
  UserCredential,
  TwitterAuthProvider,
} from "firebase/auth";
import { loginWithTwitter, logoutFromTwitter } from "../lib/auth";
import { getUserByUid, setUserByUserCredential } from "../lib/user";
import { User } from "../types/user";

const useFirebaseTwitterAuth = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const user = await getUserByUid(firebaseUser.uid);
        setUser(user);
      }
      setLoading(false);
    });
  }, [auth]);

  const login = async () => {
    setLoading(true);
    const userCredential = await loginWithTwitter();
    if (userCredential) {
      await setUserByUserCredential(userCredential);
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
