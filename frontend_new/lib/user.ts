import { getApps, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import firebaseConfig from "../config/firebaseConfig";
import type { User } from "../types/user";

export const getUserByScreenName = async (screenName: string) => {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
  const db = getFirestore();
  const q = query(
    collection(db, "users"),
    where("screen_name", "==", screenName)
  );
  const querySnapshot = await getDocs(q);

  const user = querySnapshot.docs[0].data() as User;
  return user;
};

export const setUserByUid = async (uid: string, user: User) => {
  const db = getFirestore();
  await setDoc(doc(db, "users", uid), user);
};
