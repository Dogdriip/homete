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
    await signInWithPopup(auth, provider);
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
