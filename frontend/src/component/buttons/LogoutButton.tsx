import { toast } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";

const LogoutButton = (): JSX.Element => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const logout = async () => {
    setButtonLoading(true);
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
    setButtonLoading(false);
  };

  return buttonLoading ? (
    <span>로딩중...</span>
  ) : (
    <a onClick={() => logout()}>로그아웃</a>
  );
};

export default LogoutButton;
