import React, { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";
import LoginWithTwitterButton from "./LoginWithTwitterButton";
import { userState } from "../state/userState";
import { useRecoilState } from "recoil";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import { userProfileState } from "../state/userProfileState";
import { UserProfile } from "../entities/UserProfile";
import LoadingCard from "./cards/LoadingCard";

const Home = (): JSX.Element => {
  const [user, setUser] = useRecoilState(userState);
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  const [pending, setPending] = useState<boolean>(true);

  const updateUserProfile = async (uid: string) => {
    const db = firebase.firestore();
    const doc = await db.collection("users").doc(uid).get();
    const data = doc.data() as UserProfile;
    setUserProfile(data);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({ uid: firebaseUser.uid });
        updateUserProfile(firebaseUser.uid);
      }
      setPending(false);
    });

    console.log(user);
  }, []);

  return (
    <Card.Group centered>
      {pending ? (
        <LoadingCard />
      ) : !user || !user.uid ? (
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
              로그인 완료!{" "}
              <Link to={"/" + userProfile.screen_name}>자신의 페이지</Link>를
              확인해 보세요.
              <LogoutButton />
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
    </Card.Group>
  );
};

export default Home;
