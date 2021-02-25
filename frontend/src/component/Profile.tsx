import React, { useState, useEffect, useRef } from "react";
import { Card, Image, Label, Icon, Input, Ref } from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import type { UserProfile } from "../entities/UserProfile";
import { useRecoilState } from "recoil";
import { userState } from "../state/userState";
import { userProfileState } from "../state/userProfileState";
import LoadingCard from "./cards/LoadingCard";
import HometeCard from "./cards/HometeCard";
import { Homete } from "../entities/Homete";

const Profile = ({ match }) => {
  const { username }: { username: string } = match.params;

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [hometes, setHometes] = useState<Homete[]>();
  const [pending, setPending] = useState<boolean>(true);
  const [description, setDescription] = useState<string>("");

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

  const getHometes = async (username: string) => {
    const db = firebase.firestore();
    const querySnapshot = await db
      .collection("hometes")
      .where("recipient", "==", username)
      .get();

    let hometes: Homete[] = [];
    querySnapshot.forEach((doc) => {
      hometes.push(doc.data() as Homete);
    });
    hometes.sort(
      (a: Homete, b: Homete) =>
        b.timestamp.toDate().getTime() - a.timestamp.toDate().getTime()
    );
    return hometes;
  };

  const onSend = () => {
    const db = firebase.firestore();
    db.collection("hometes")
      .doc()
      .set({
        recipient: profile.screen_name,
        description: description,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log("Document successfully written!");
        getHometes(username).then((data) => {
          setHometes(data);
        });
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  useEffect(() => {
    // Get current page's user profile.
    getUserProfile(username).then((data) => {
      setProfile(data);
      // Get current page's user hometes.
      getHometes(username).then((data) => {
        setHometes(data);
        setPending(false);
      });
    });
  }, []);

  return (
    <Card.Group centered>
      {pending ? (
        <LoadingCard />
      ) : profile ? (
        <>
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
          <Card fluid color="blue">
            <Card.Content>
              <Input
                fluid
                action={{
                  icon: "send",
                  onClick: onSend,
                }}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="익명으로 칭찬하기..."
              />
            </Card.Content>
          </Card>
          {hometes.map((homete) => (
            <HometeCard key={1} {...homete} />
          ))}
        </>
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
