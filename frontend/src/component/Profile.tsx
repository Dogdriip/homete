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
import { userProfileState } from "../state/userProfileState";
import { unresolvedHometesState } from "../state/unresolvedHometesState";
import { resolvedHometesState } from "../state/resolvedHometesState";
import { setMaxListeners } from "process";

const Profile = ({ match }): JSX.Element => {
  const { username }: { username: string } = match.params;

  const [profile, setProfile] = useRecoilState<UserProfile | null>(
    userProfileState
  );
  const [hometes, setHometes] = useRecoilState<Homete[]>(hometesState);
  const [unresolvedHometes, setUnresolvedHometes] = useRecoilState<Homete[]>(
    unresolvedHometesState
  );
  const [resolvedhometes, setResolvedHometes] = useRecoilState<Homete[]>(
    resolvedHometesState
  );
  const [pending, setPending] = useState<boolean>(true);
  const [snapshot, setSnapshot] = useState<firebase.firestore.QuerySnapshot>(
    null
  );
  const [fetchingHometes, setFetchingHometes] = useState<boolean>(true);

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

  const fetchHometes = async (username: string) => {
    setFetchingHometes(true);
    const db = firebase.firestore();

    if (!snapshot) {
      const querySnapshot = await db
        .collection("hometes")
        .orderBy("timestamp", "desc")
        .where("recipient", "==", username)
        .limit(5)
        .get();

      setHometes(
        querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Homete)
        )
      );
      setSnapshot(querySnapshot);
    } else {
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      if (lastVisible === undefined) {
        setFetchingHometes(false);
        return;
      }
      const querySnapshot = await db
        .collection("hometes")
        .orderBy("timestamp", "desc")
        .where("recipient", "==", username)
        .startAfter(lastVisible)
        .limit(5)
        .get();

      setHometes((homete) =>
        homete.concat(
          querySnapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Homete)
          )
        )
      );
      setSnapshot(querySnapshot);
    }

    setFetchingHometes(false);
  };

  useEffect(() => {
    // Get current page's user profile.
    getUserProfile(username).then((data) => {
      setProfile(data);
      setPending(false);

      // Fetching first 5 hometes.
      fetchHometes(username).then(() => {});

      // Set listener.
      let listener;
      let initialState: boolean = true;
      if (
        firebase.auth().currentUser &&
        data.uid === firebase.auth().currentUser.uid
      ) {
        console.log("listener is available.");
        const db = firebase.firestore();
        listener = db
          .collection("hometes")
          .orderBy("timestamp", "desc")
          .where("recipient", "==", username)
          .onSnapshot((querySnapshot) => {
            if (initialState) {
              initialState = false;
              return;
            }

            querySnapshot.docChanges().forEach((change) => {
              if (
                (change.type === "added" &&
                  !change.doc.metadata.hasPendingWrites) ||
                change.type === "modified"
              ) {
                // Received from server.
                Notification.requestPermission().then((result) => {
                  console.log(result);
                  const notification = new Notification(
                    "새로운 칭찬이 도착했어요!",
                    {
                      icon:
                        "https://firebasestorage.googleapis.com/v0/b/homete-9bace.appspot.com/o/homete_icon.jpg?alt=media&token=af685340-c05b-45ba-94e6-9b2b77aad598",
                      body: change.doc.data().description,
                    }
                  );
                  notification.onclick = function () {
                    window.open(`https://homete.driip.me/${username}`);
                  };
                });
                console.log("Modified homete: ", change.doc.data());
                setHometes(
                  querySnapshot.docs.map(
                    (doc) => ({ id: doc.id, ...doc.data() } as Homete)
                  )
                );
              }
              if (change.type === "removed") {
                console.log("Removed homete: ", change.doc.data());
              }
            });
          });
      }
    });
  }, []);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && !fetchingHometes) {
      fetchHometes(username);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    setUnresolvedHometes(hometes.filter((homete) => !homete.resolved));
    setResolvedHometes(hometes.filter((homete) => homete.resolved));
  }, [hometes]);

  if (pending) {
    return <LoadingCard />;
  } else {
    return (
      <Card.Group centered>
        {profile ? (
          <>
            <ProfileCard {...profile} />
            <SendHometeCard recipient={profile.screen_name} />
            {firebase.auth().currentUser &&
              profile.uid === firebase.auth().currentUser.uid && (
                <Card fluid color="blue">
                  <Card.Content>
                    <Card.Header as="h1">새로 도착한 칭찬들</Card.Header>
                    <Card.Meta>
                      승인한 칭찬은 프로필에 나타나고, 트위터에 게시할 수도
                      있어요.
                    </Card.Meta>
                    {unresolvedHometes.length === 0 ? (
                      <Card fluid>
                        <Card.Content>
                          <Card.Meta>아직 새로 받은 칭찬이 없어요...</Card.Meta>
                        </Card.Content>
                      </Card>
                    ) : (
                      unresolvedHometes.map((homete) => (
                        <HometeCard key={homete.id} {...homete} />
                      ))
                    )}
                  </Card.Content>
                </Card>
              )}
            {resolvedhometes.length === 0 ? (
              <Card fluid>
                <Card.Content>
                  <Card.Meta>아직 받은 칭찬이 없어요...</Card.Meta>
                </Card.Content>
              </Card>
            ) : (
              resolvedhometes.map((homete) => (
                <HometeCard key={homete.id} {...homete} />
              ))
            )}
            {fetchingHometes && <LoadingCard />}
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
  }
};

export default Profile;
