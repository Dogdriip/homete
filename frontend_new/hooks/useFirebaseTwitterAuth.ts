import React, { useState, useEffect } from "react";
import {
  User as FirebaseUser,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { loginWithTwitter, logoutFromTwitter } from "../lib/auth";
import { setUserByUid } from "../lib/user";
import { User } from "../types/user";

const useFirebaseTwitterAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log(firebaseUser);
      }
    });
  }, []);

  const login = async () => {
    setLoading(true);
    await loginWithTwitter();
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
