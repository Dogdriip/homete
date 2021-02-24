import { Button, Icon } from "semantic-ui-react";
import firebase from "firebase/app";
import "firebase/auth";
import { userState } from "../state/userState";
import { useRecoilState } from "recoil";

const LoginWithTwitterButton = (): JSX.Element => {
  const [user, setUser] = useRecoilState(userState);

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

      console.log(firebase.auth().currentUser);
      setUser({ name: profile["name"] });
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
