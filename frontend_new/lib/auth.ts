import {
  TwitterAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";

export const loginWithTwitter = async () => {
  const auth = getAuth();
  const provider = new TwitterAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential;
  } catch (e) {
    console.error(e);
  }
};

export const logoutFromTwitter = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (e) {
    console.error(e);
  }
};
