import { Button, Icon } from "semantic-ui-react";
import firebase from "firebase/app";
import "firebase/auth";
import { userState } from "../state/userState";
import { useRecoilState } from "recoil";

const LogoutButton = (): JSX.Element => {
  const [user, setUser] = useRecoilState(userState);

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      setUser({
        name: null,
      });
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
