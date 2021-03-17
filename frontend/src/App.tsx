import { useEffect } from "react";
import { Route } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import HometeTemplate from "./component/HometeTemplate";
import Home from "./component/Home";
import Profile from "./component/Profile";
import { useRecoilState } from "recoil";
import { UserProfile } from "./entities/UserProfile";
import { userProfileState } from "./states/userProfileState";
import { SemanticToastContainer } from "react-semantic-toasts";
import "./App.scss";

const App = (): JSX.Element => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          const db = firebase.firestore();
          const doc = await db.collection("users").doc(firebaseUser.uid).get();
          const data = doc.data() as UserProfile;
          setUserProfile(data);
        } else {
          setUserProfile(null);
        }
      });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <HometeTemplate>
        <Route path="/" component={Home} exact />
        <Route path="/:username" component={Profile} />
      </HometeTemplate>
      <SemanticToastContainer position="top-right" />
    </>
  );
};

export default App;
