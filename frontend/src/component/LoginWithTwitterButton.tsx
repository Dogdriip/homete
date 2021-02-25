import { Button, Icon } from "semantic-ui-react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { userState } from "../state/userState";
import { userProfileState } from "../state/userProfileState";
import { useRecoilState } from "recoil";
import { UserProfile } from "../entities/UserProfile";

const LoginWithTwitterButton = (): JSX.Element => {
  const [user, setUser] = useRecoilState(userState);
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);

  const loginWithTwitter = async () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    try {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const result = await firebase.auth().signInWithPopup(provider);

      const user = result.user;
      const additionalUserInfo = result.additionalUserInfo;
      const profile = additionalUserInfo.profile;

      setUser({ uid: user.uid }); // set state

      const db = firebase.firestore();
      const userProfileVal: UserProfile = {
        uid: user.uid,
        name: profile["name"],
        screen_name: profile["screen_name"],
        description: profile["description"],
        profile_image_url: profile["profile_image_url"].replace("_normal", ""),
        profile_image_url_https: profile["profile_image_url_https"].replace(
          "_normal",
          ""
        ),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      await db.collection("users").doc(user.uid).set(userProfileVal);

      setUserProfile(userProfileVal);
    } catch (e) {
      console.log(e.code);
      console.log(e.message);
    }
  };

  const onLogin = () => {
    loginWithTwitter();
  };

  return (
    <Button color="twitter" onClick={onLogin}>
      <Icon name="twitter" /> Sign in with Twitter
    </Button>
  );
};

export default LoginWithTwitterButton;
