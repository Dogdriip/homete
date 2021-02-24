import React, { useState, useEffect } from "react";
import { Header, Card, Button, Icon, Message } from "semantic-ui-react";
import LoginWithTwitterButton from "./LoginWithTwitterButton";
import { userState } from "../state/userState";
import { useRecoilState } from "recoil";
import firebase from "firebase/app";
import "firebase/auth";
import LogoutButton from "./LogoutButton";

const Home = (): JSX.Element => {
  const [user, setUser] = useRecoilState(userState);
  const [pending, setPending] = useState<boolean>(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("user state changed.");
      setPending(false);

      const firebaseUser = firebase.auth().currentUser;
      console.log("useEffect firebaseUser: ", firebaseUser);
      if (firebaseUser) {
        console.log("firebaseUser is exist");
        setUser({ name: firebaseUser.displayName });
      } else {
        console.log("firebaseUser is not exist");
      }
    });
  }, []);

  const onLogout = () => {};

  return (
    <>
      <Header as="h1">homete!</Header>
      <Message info>
        <p>알파 서비스 중입니다!</p>
      </Message>
      <Card.Group centered>
        {pending ? (
          <Card fluid color="blue">
            <Card.Content>
              <Card.Header>로딩중...</Card.Header>
            </Card.Content>
          </Card>
        ) : !user.name ? (
          <Card fluid color="blue">
            <Card.Content>
              <Card.Header>트위터로 로그인</Card.Header>
              <Card.Meta>
                트위터로 로그인해야 서비스를 사용할 수 있어요!
              </Card.Meta>
              <Card.Description>
                <LoginWithTwitterButton />
              </Card.Description>
            </Card.Content>
          </Card>
        ) : (
          <Card fluid color="blue">
            <Card.Content>
              <Card.Header>트위터로 로그인</Card.Header>
              <Card.Meta>
                트위터로 로그인해야 서비스를 사용할 수 있어요!
              </Card.Meta>
              <Card.Description>
                로그인 완료! 자신의 페이지를 확인해 보세요.
                {user.name}
                <LogoutButton />
              </Card.Description>
            </Card.Content>
          </Card>
        )}
      </Card.Group>
    </>
  );
};

export default Home;
