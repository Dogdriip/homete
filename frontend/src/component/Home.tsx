import React, { useState, useEffect } from "react";
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
import firebaseConfig from "../config/firebase";

firebase.initializeApp(firebaseConfig);

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

const Home = () => {
  const [state, setState] = useState<LoginState>({
    isAuthenticated: false,
    token: null,
    secret: null,
    user: null,
  });

  const provider = new firebase.auth.TwitterAuthProvider();

  const onLogin = async () => {
    try {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION);
      const result = await firebase.auth().signInWithPopup(provider);

      const credential: firebase.auth.OAuthCredential = result.credential;

      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      const token = credential.accessToken;
      const secret = credential.secret;

      // The signed-in user info.
      const user = result.user;
      const additionalUserInfo = result.additionalUserInfo;
      const profile = additionalUserInfo.profile;

      console.log(user);
      console.log(additionalUserInfo);

      setState({
        isAuthenticated: true,
        token,
        secret,
        user: {
          id: profile["id"],
          name: profile["name"],
          screen_name: profile["screen_name"],
          description: profile["description"],
          profile_image_url: profile["profile_image_url"].replace(
            "_normal",
            ""
          ),
          profile_image_url_https: profile["profile_image_url_https"].replace(
            "_normal",
            ""
          ),
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
    <>
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
