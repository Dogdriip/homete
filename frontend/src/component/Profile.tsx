import React, { useState, useEffect } from "react";
import { Header, Card, Message, Image, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import type { UserProfile } from "../entities/UserProfile";
import { useRecoilState } from "recoil";
import { userState } from "../state/userState";
import { userProfileState } from "../state/userProfileState";
import LoginWithTwitterButton from "./LoginWithTwitterButton";
import LoadingCard from "./cards/LoadingCard";

const Profile = ({ match }) => {
  const { username }: { username: string } = match.params;

  const [user, setUser] = useRecoilState(userState);
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [pending, setPending] = useState<boolean>(true);

  const getUserProfile = async (
    username: string
  ): Promise<UserProfile | null> => {
    const db = firebase.firestore();
    const querySnapshot = await db
      .collection("users")
      .where("screen_name", "==", username)
      .get();
    let pf;
    querySnapshot.forEach((doc) => {
      pf = doc.data();
    });
    return pf;
  };

  useEffect(() => {
    getUserProfile(username).then((data) => {
      setProfile(data);
      setPending(false);
    });
  }, []);

  return (
    <Card.Group centered>
      {pending ? (
        <LoadingCard />
      ) : profile ? (
        <Card fluid color="blue">
          <Card.Content>
            <Image
              floated="left"
              size="tiny"
              circular
              src={profile.profile_image_url}
            />
            <Card.Header as="h1">{profile.name}</Card.Header>
            <Card.Meta>
              <Label>@{profile.screen_name}</Label>
            </Card.Meta>
            <Card.Description>{profile.description}</Card.Description>
          </Card.Content>
        </Card>
      ) : (
        <Card fluid color="blue">
          <Card.Content>
            <Card.Header as="h1">
              아직 서비스에 가입하지 않은 사용자예요!
            </Card.Header>
            <Card.Description>
              해당 사용자가 아직 서비스에 가입하지 않았어요.{" "}
              <Link to="/">메인 페이지</Link>에서 트위터 계정으로 로그인하기만
              하면 가입이 완료돼요.
            </Card.Description>
          </Card.Content>
        </Card>
      )}
    </Card.Group>
  );
};

export default Profile;
