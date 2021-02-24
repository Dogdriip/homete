import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
const useAuth = (): [string | null, () => void] => {
  const [user, setUser] = useState<string | null>(null);
  const [flag, setFlag] = useState<number>(-1);
  useEffect(() => {
    if (flag === -1) return;
    console.log("테스트입니다.", user);
    setUser((user) => {
      if (!user) user = "a";
      else user += "a";
      console.log("유저 설정됨", user);
      return user;
    });
  }, [flag]);

  const loadUser = () => {
    setFlag((flag) => (flag + 1) % 2);
  };
  return [user, loadUser];
};

export default useAuth;
