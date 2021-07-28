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
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (e) {
    console.error(e);
  }
};

export const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (e) {
    console.error(e);
  }
};
