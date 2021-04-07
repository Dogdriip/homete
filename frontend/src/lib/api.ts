import firebase from "firebase/app";
import "firebase/firestore";
import { User } from "../types/User";

export const loginWithTwitter = async () => {
  const auth = firebase.auth();
  const provider = new firebase.auth.TwitterAuthProvider();
  try {
    const result = await auth.signInWithPopup(provider);
    return result;
  } catch (e) {
    console.error(e);
  }
};

export const logout = async () => {
  const auth = firebase.auth();
  try {
    await auth.signOut();
  } catch (e) {
    console.error(e);
  }
};

export const setUserByUid = async (uid: string, user: User) => {
  const db = firebase.firestore();
  db.collection("users").doc(uid).set(user);
};

export const getUserByScreenName = async (
  screenName: string,
): Promise<User> => {
  const db = firebase.firestore();
  const querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = await db
    .collection("users")
    .where("screen_name", "==", screenName)
    .get();
  const user: User = querySnapshot.docs[0].data() as User;

  return user;
};

export default {};
