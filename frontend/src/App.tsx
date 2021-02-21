import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Container,
  Header,
  Card,
  Button,
  Icon,
  Message,
  Image,
  Label,
  Segment,
} from "semantic-ui-react";
import firebase from "firebase/app";
import "firebase/auth";

interface User {
  id: string;
  name: string;
  screen_name: string;
  description: string;
  profile_image_url_https: string;
  profile_image_url: string;
}

interface LoginState {
  isAuthenticated: boolean;
  token: string | null;
  secret: string | null;
  user: User | null;
}

const firebaseConfig = {
  apiKey: "AIzaSyA_U03Au49VBs-vdhSb5CUWeaYErCFTMAc",
  authDomain: "homete-9bace.firebaseapp.com",
  projectId: "homete-9bace",
  storageBucket: "homete-9bace.appspot.com",
  messagingSenderId: "950277086668",
  appId: "1:950277086668:web:8b1788eb752ca6a3731169",
  measurementId: "G-M1SSFG4HH7",
};

const App = () => {
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (e) {
    console.error(e);
  }

  const [state, setState] = useState<LoginState>({
    isAuthenticated: false,
    token: null,
    secret: null,
    user: null,
  });

  const provider = new firebase.auth.TwitterAuthProvider();

  const onLogin = async () => {
    try {
      const result = await firebase.auth().signInWithPopup(provider);

      const credential: firebase.auth.OAuthCredential = result.credential;

      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      const token = credential.accessToken;
      const secret = credential.secret;

      // The signed-in user info.
      const user: firebase.User = result.user;
      const additionalUserInfo: firebase.auth.AdditionalUserInfo =
        result.additionalUserInfo;
      const profile = additionalUserInfo.profile;

      setState({
        isAuthenticated: true,
        token,
        secret,
        user: {
          id: profile["id"],
          name: profile["name"],
          screen_name: profile["screen_name"],
          description: profile["description"],
          profile_image_url: profile["profile_image_url"],
          profile_image_url_https: profile["profile_image_url_https"],
        },
      });
    } catch (e) {
      console.log(e.code);
      console.log(e.message);
    }
  };

  const onLogout = async () => {
    try {
      await firebase.auth().signOut();
      setState({
        isAuthenticated: false,
        token: null,
        secret: null,
        user: null,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container text style={{ margin: 20 }}>
      <Header as="h1">homete!</Header>
      <Message info>
        <p>알파 서비스 중입니다!</p>
      </Message>
      <Card.Group centered>
        {!state.isAuthenticated ? (
          <Card fluid color="blue">
            <Card.Content>
              <Card.Header>트위터로 로그인</Card.Header>
              <Card.Meta>
                트위터로 로그인해야 서비스를 사용할 수 있어요!
              </Card.Meta>
              <Card.Description>
                <Button color="twitter" onClick={onLogin}>
                  <Icon name="twitter" /> Sign in with Twitter
                </Button>
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
                로그인 완료! 자신의 페이지를 확인해 보세요.{" "}
                <a onClick={onLogout}>로그아웃</a>
              </Card.Description>
            </Card.Content>
          </Card>
        )}

        <Card fluid color="blue">
          <Card.Content>
            <Card.Header>어떤 서비스인가요?</Card.Header>
            <Card.Description>저도 몰라요!</Card.Description>
          </Card.Content>
        </Card>

        <Card fluid color="blue">
          <Card.Content>
            <Image
              floated="left"
              size="tiny"
              circular
              src="https://via.placeholder.com/150"
            />
            <Card.Header>Username</Card.Header>
            <Card.Meta>
              <Label>
                <Icon name="at" />
                <Label.Detail>username</Label.Detail>
              </Label>
            </Card.Meta>
            <Card.Description>
              <p>description</p>
            </Card.Description>
          </Card.Content>
        </Card>

        <Card fluid color="blue">
          <Card.Content>
            <Card.Header>사용자 설정</Card.Header>
            <Card.Meta>자신의 페이지에서만 보입니다.</Card.Meta>
            <Card.Description>
              <Card.Group>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>후원 계좌 설정</Card.Header>
                    <Card.Description>description</Card.Description>
                  </Card.Content>
                </Card>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>후원 계좌 설정</Card.Header>
                    <Card.Description>description</Card.Description>
                  </Card.Content>
                </Card>
              </Card.Group>
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>

      <Card.Group>
        <Card fluid>
          <Card.Content>
            <Card.Description>드립님 너무 멋져요</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name="time" />
            1시간 전
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Description>드립님 너무 멋져요</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name="time" />
            1시간 전
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Description>드립님 너무 멋져요</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name="time" />
            1시간 전
          </Card.Content>
        </Card>
      </Card.Group>
    </Container>
  );
};

export default App;
