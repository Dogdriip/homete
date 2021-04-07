import { useEffect } from "react";
import { Card } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from "../modules/user";
import { RootState } from "../modules";
import LoadingCard from "./cards/LoadingCard";
import ProfileCard from "./cards/ProfileCard";

const Profile: React.FC = () => {
  const { username }: { username: string } = useParams();
  const { loading, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsync.request(username));
  }, [dispatch]);

  if (loading.FETCH) {
    return <LoadingCard />;
  } else {
    return (
      <Card.Group centered>
        {user ? (
          <ProfileCard {...user} />
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
