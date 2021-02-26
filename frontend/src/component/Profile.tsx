import { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import type { UserProfile } from "../entities/UserProfile";
import LoadingCard from "./cards/LoadingCard";
import HometeCard from "./cards/HometeCard";
import { Homete } from "../entities/Homete";
import ProfileCard from "./cards/ProfileCard";
import SendHometeCard from "./cards/SendHometeCard";
import { useRecoilState } from "recoil";
import { hometesState } from "../state/hometesState";
import firebase from "firebase/app";
import "firebase/firestore";

const Profile = ({ match }) => {
  const { username }: { username: string } = match.params;

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [hometes, setHometes] = useRecoilState<Homete[]>(hometesState);
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

  const getHometes = async (username: string) => {
    const db = firebase.firestore();
    const querySnapshot = await db
      .collection("hometes")
      .where("recipient", "==", username)
      .get();

    let hometes: Homete[] = [];
    querySnapshot.forEach((doc) => {
      hometes.push({ id: doc.id, ...doc.data() } as Homete);
    });
    hometes.sort(
      (a: Homete, b: Homete) =>
        b.timestamp.toDate().getTime() - a.timestamp.toDate().getTime()
    );
    return hometes;
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
          <ProfileCard {...profile} />
          <SendHometeCard recipient={profile.screen_name} />
          {hometes.length == 0 ? (
            <Card fluid color="blue">
              <Card.Content>
                <Card.Meta>아직 받은 칭찬이 없어요...</Card.Meta>
              </Card.Content>
            </Card>
          ) : (
            hometes
              .filter((homete) => homete.resolved)
              .map((homete) => <HometeCard key={homete.id} {...homete} />)
          )}
          <Card fluid color="blue">
            <Card.Content>
              <Card.Header as="h1">새로 도착한 칭찬들</Card.Header>
              <Card.Meta>
                승인한 칭찬은 바로 트위터에 게시되고, 자신의 프로필에
                나타납니다.
              </Card.Meta>
              {hometes
                .filter((homete) => !homete.resolved)
                .map((homete) => (
                  <HometeCard key={homete.id} {...homete} />
                ))}
            </Card.Content>
          </Card>
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
