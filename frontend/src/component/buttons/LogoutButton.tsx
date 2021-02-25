import { Button, Icon } from "semantic-ui-react";
import firebase from "firebase/app";
import "firebase/auth";
import { useRecoilState } from "recoil";
import { userProfileState } from "../../state/userProfileState";

const LogoutButton = (): JSX.Element => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      setUserProfile(null);
    } catch (e) {
      console.log(e);
    }
  };

  return <a onClick={() => logout()}>로그아웃</a>;
};

export default LogoutButton;
