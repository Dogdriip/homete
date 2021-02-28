import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { UserProfile } from "../../entities/UserProfile";
import { toast } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const LoginWithTwitterButton = (): JSX.Element => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const loginWithTwitter = async () => {
    setButtonLoading(true);

    const provider = new firebase.auth.TwitterAuthProvider();
    try {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const result = await firebase.auth().signInWithPopup(provider);

      const credential: firebase.auth.OAuthCredential = result.credential;
      const token = credential.accessToken;
      const secret = credential.secret;

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
    setButtonLoading(false);
  };

  return (
    <Button
      color="twitter"
      loading={buttonLoading}
      disabled={buttonLoading}
      onClick={() => loginWithTwitter()}
    >
      <Icon name="twitter" /> Sign in with Twitter
    </Button>
  );
};

export default LoginWithTwitterButton;
