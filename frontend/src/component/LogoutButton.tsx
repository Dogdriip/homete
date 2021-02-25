import { Button, Icon } from "semantic-ui-react";
import firebase from "firebase/app";
import "firebase/auth";
import { userState } from "../state/userState";
import { useRecoilState } from "recoil";
import { userProfileState } from "../state/userProfileState";

const LogoutButton = (): JSX.Element => {
  const [user, setUser] = useRecoilState(userState);
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
      setUserProfile(null);
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = () => {
    logout();
  };

  return <a onClick={onLogout}>로그아웃</a>;
};

export default LogoutButton;
