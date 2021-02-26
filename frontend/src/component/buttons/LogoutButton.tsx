import { toast } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";
import firebase from "firebase/app";
import "firebase/auth";

const LogoutButton = (): JSX.Element => {
  const logout = async () => {
    try {
      await firebase.auth().signOut();
      toast({
        title: "로그아웃 완료!",
        type: "success",
        description: "로그아웃 되었습니다.",
        time: 3000,
        animation: "fade left",
      });
    } catch (e) {
      console.log(e);
    }
  };

  return <a onClick={() => logout()}>로그아웃</a>;
};

export default LogoutButton;
