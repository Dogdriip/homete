import { getApps, initializeApp } from "firebase/app";
import { UserCredential, getAdditionalUserInfo } from "firebase/auth";
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

export const setUserByUserCredential = async (
  userCredential: UserCredential
) => {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
  const db = getFirestore();

  const additionalUserInfo = getAdditionalUserInfo(userCredential);
  const profile = additionalUserInfo!.profile;
  const user = {
    uid: userCredential.user.uid,
    name: profile?.name,
    screen_name: profile?.screen_name,
    description: profile?.description,
    profile_image_url: String(profile?.profile_image_url).replace(
      "_normal",
      ""
    ),
    profile_image_url_https: String(profile?.profile_image_url_https).replace(
      "_normal",
      ""
    ),
    // timestamp: serverTimestamp(),
  } as User;

  await setDoc(doc(db, "users", userCredential.user.uid), user);
  return user;
};
