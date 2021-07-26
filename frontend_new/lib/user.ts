import { getApps, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import firebaseConfig from "../config/firebaseConfig";
import type { User } from "../types/user";

export const getAllUserScreenNames = async () => {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
  const db = getFirestore();
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);

  const users: User[] = [];
  querySnapshot.docs.forEach((doc) => {
    users.push(doc.data() as User);
  });

  const screenNames = users.map((user: User) => user.screen_name);

  return screenNames.map((screenName) => ({
    params: {
      screenName,
    },
  }));
};

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
  return {
    ...user,
    timestamp: user.timestamp.toString(),
  };
};
