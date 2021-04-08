import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Image, Label, Popup } from "semantic-ui-react";
import { RootState } from "../../modules";
import { fetchContributorAsync } from "../../modules/user";
import { User } from "../../types/User";

const randomLabelArr = [
  <Label color="orange">귀여운 아타시!</Label>,
  <Label color="blue">멋있는 나님!</Label>,
  <Label color="pink">깜찍한 와타시!</Label>,
];
const randomLabel =
  randomLabelArr[Math.floor(Math.random() * randomLabelArr.length)];

const ProfileCard: React.FC<User> = (user: User) => {
  const auth = useSelector((state: RootState) => state.auth.auth);
  const contributor = useSelector((state: RootState) => state.user.contributor);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContributorAsync.request(user.screen_name));
  }, [dispatch, user]);

  return (
    <Card fluid color="blue">
      <Card.Content>
        {contributor ? (
          <Popup
            content={contributor}
            trigger={
              <Image
                floated="left"
                size="tiny"
                circular
                src={user.profile_image_url_https}
                style={{ boxShadow: "rgb(255 215 0 / 80%) 0px 4px 10px 0px" }}
              />
            }
          />
        ) : (
          <Image
            floated="left"
            size="tiny"
            circular
            src={user.profile_image_url_https}
          />
        )}
        <Card.Header as="h1" style={{ marginTop: 10, marginBottom: 10 }}>
          {user.name}
        </Card.Header>
        <Card.Meta>
          <Label
            as="a"
            href={"https://twitter.com/" + user.screen_name}
            target="_blank"
          >
            @{user.screen_name}
          </Label>
          {auth && auth.uid === user.uid && randomLabel}
        </Card.Meta>
        <Card.Description>{user.description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;
