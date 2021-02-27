import { useState, useEffect } from "react";
import { Card, List } from "semantic-ui-react";
import LoginWithTwitterButton from "./buttons/LoginWithTwitterButton";
import LogoutButton from "./buttons/LogoutButton";
import { Link } from "react-router-dom";
import { UserProfile } from "../entities/UserProfile";
import LoadingCard from "./cards/LoadingCard";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Home = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState<UserProfile>(null);
  const [pending, setPending] = useState<boolean>(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const db = firebase.firestore();
        const doc = await db.collection("users").doc(firebaseUser.uid).get();
        const data = doc.data() as UserProfile;
        setUserProfile(data);
      } else {
        setUserProfile(null);
      }
      setPending(false);
    });
  }, []);

  return (
    <Card.Group centered>
      {pending ? (
        <LoadingCard />
      ) : !userProfile ? (
        <Card fluid color="blue">
          <Card.Content>
            <Card.Header>트위터로 로그인</Card.Header>
            <Card.Meta>
              트위터로 로그인하면 자신의 페이지를 확인할 수 있어요!
            </Card.Meta>
            <Card.Description>
              <LoginWithTwitterButton />
            </Card.Description>
          </Card.Content>
        </Card>
      ) : (
        <>
          <Card fluid color="blue">
            <Card.Content>
              <Card.Header>트위터로 로그인</Card.Header>
              <Card.Meta>
                트위터로 로그인하면 자신의 페이지를 확인할 수 있어요!
              </Card.Meta>
              <Card.Description>
                @{userProfile.screen_name}으로 로그인 완료!{" "}
                <Link to={"/" + userProfile.screen_name}>자신의 페이지</Link>를
                확인해 보세요. <LogoutButton />
              </Card.Description>
            </Card.Content>
          </Card>
        </>
      )}
      <Card fluid color="blue">
        <Card.Content>
          <Card.Header>어떤 서비스인가요?</Card.Header>
          <Card.Description>
            <List bulleted>
              <List.Item>모두가 칭찬받고 칭찬할 수 있는 플랫폼!</List.Item>
              <List.Item>
                받은 칭찬은 삭제할 수도 있고, 승인할 수도 있어요.
              </List.Item>
              <List.Item>
                승인한 칭찬은 프로필에 나타나고, 트위터에 게시할 수도 있어요.
              </List.Item>
            </List>
          </Card.Description>
        </Card.Content>
      </Card>
      <Card fluid color="blue">
        <Card.Content>
          <Card.Header>어떻게 사용하나요?</Card.Header>
          <Card.Description>
            <List bulleted>
              <List.Item>
                트위터로 로그인하기만 하면 가입이 완료되고, 자신의 페이지가
                생겨요.
              </List.Item>
            </List>
          </Card.Description>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default Home;
