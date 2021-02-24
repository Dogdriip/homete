import React, { useEffect } from "react";
import { Header, Card, Button, Icon, Message } from "semantic-ui-react";
import useAuth from "../hooks/useAuth";
import LoginWithTwitterButton from "./LoginWithTwitterButton";

const Home = (): JSX.Element => {
  const onLogin = () => {};
  const onLogout = () => {};
  const [user] = useAuth();
  useEffect(() => {
    if (!user) {
      console.log("노로그인");
    } else {
      console.log("로그인됨", user);
    }
  }, [user]);
  return (
    <>
      <Header as="h1">homete!</Header>
      <Message info>
        <p>알파 서비스 중입니다!</p>
      </Message>
      <Card.Group centered>
        {!user ? (
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
                <a onClick={onLogout}>로그아웃</a>
              </Card.Description>
            </Card.Content>
          </Card>
        )}
      </Card.Group>
    </>
  );
};

export default Home;
