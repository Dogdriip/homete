import { useEffect, useMemo } from "react";
import { Card } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync as userFetchAsync } from "../modules/user";
import { fetchAsync as hometesFetchAsync } from "../modules/hometes";
import { RootState } from "../modules";
import LoadingCard from "./cards/LoadingCard";
import ProfileCard from "./cards/ProfileCard";
import SendHometeCard from "./cards/SendHometeCard";
import HometeCard from "./cards/HometeCard";

const Profile: React.FC = () => {
  const { username }: { username: string } = useParams();

  const auth = useSelector((state: RootState) => state.auth.auth);

  const loadingUser = useSelector(
    (state: RootState) => state.user.loading.FETCH,
  );
  const user = useSelector((state: RootState) => state.user.user);

  const loadingHometes = useSelector(
    (state: RootState) => state.hometes.loading.FETCH,
  );
  const hometes = useSelector((state: RootState) => state.hometes.hometes);
  const resolvedHometes = useMemo(
    () => hometes.filter((homete) => homete.resolved),
    [hometes],
  );
  const unresolvedHometes = useMemo(
    () => hometes.filter((homete) => !homete.resolved),
    [hometes],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userFetchAsync.request(username));
    dispatch(hometesFetchAsync.request(username));
  }, [dispatch, username]);

  if (loadingUser) {
    return <LoadingCard />;
  } else {
    return (
      <Card.Group centered>
        {user ? (
          <>
            <ProfileCard {...user} />
            <SendHometeCard recipient={user.screen_name} />
            {loadingHometes && <LoadingCard />}
            {!loadingHometes && auth && auth.uid === user.uid && (
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
            {!loadingHometes && resolvedHometes.length === 0 ? (
              <Card fluid>
                <Card.Content>
                  <Card.Meta>아직 받은 칭찬이 없어요...</Card.Meta>
                </Card.Content>
              </Card>
            ) : (
              resolvedHometes.map((homete) => (
                <HometeCard key={homete.id} {...homete} />
              ))
            )}
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
