import { Button, Icon } from "semantic-ui-react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { userProfileState } from "../../state/userProfileState";
import { useRecoilState } from "recoil";
import { UserProfile } from "../../entities/UserProfile";
import { toast } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";

const LoginWithTwitterButton = (): JSX.Element => {
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
      toast({
        title: "로그인 완료!",
        type: "success",
        description: `@${profile["screen_name"]}으로 로그인되었습니다.`,
        time: 3000,
        animation: "fade left",
      });
    } catch (e) {
      console.log(e.code);
      console.log(e.message);
    }
  };

  return (
    <Button color="twitter" onClick={() => loginWithTwitter()}>
      <Icon name="twitter" /> Sign in with Twitter
    </Button>
  );
};

export default LoginWithTwitterButton;
