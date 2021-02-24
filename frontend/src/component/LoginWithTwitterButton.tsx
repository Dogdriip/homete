import { Button, Icon } from "semantic-ui-react";
import firebase from "firebase/app";
import "firebase/auth";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const LoginWithTwitterButton = (): JSX.Element => {
  const [, loadUser] = useAuth();
  useEffect(() => {
    // firebase.auth().onAuthStateChanged(function (user) {
    //   console.log("실행됨?", user);
    //   if (user) {
    //     loadUser();
    //   } else {
    //     // No user is signed in.
    //     console.log("엥?");
    //   }
    // });
  }, []);

  const loginWithTwitter = async () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const credential: firebase.auth.OAuthCredential = result.credential;
      const token = credential.accessToken;
      const secret = credential.secret;
      loadUser();
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
