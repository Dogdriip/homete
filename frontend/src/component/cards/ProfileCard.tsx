import { Card, Image, Label } from "semantic-ui-react";
import { UserProfile } from "../../entities/UserProfile";
import firebase from "firebase/app";

const randomLabelArr = [
  <Label color="orange">귀여운 아타시!</Label>,
  <Label color="blue">멋있는 나님!</Label>,
  <Label color="pink">깜찍한 와타시!</Label>,
];
const randomLabel =
  randomLabelArr[Math.floor(Math.random() * randomLabelArr.length)];

const ProfileCard = (profile: UserProfile) => {
  return (
    <Card fluid color="blue">
      <Card.Content>
        <Image
          floated="left"
          size="tiny"
          circular
          src={profile.profile_image_url_https}
        />
        <Card.Header as="h1" style={{ marginTop: 10, marginBottom: 10 }}>
          {profile.name}
        </Card.Header>
        <Card.Meta>
          <Label
            as="a"
            href={"https://twitter.com/" + profile.screen_name}
            target="_blank"
          >
            @{profile.screen_name}
          </Label>
          {firebase.auth().currentUser &&
            profile.uid === firebase.auth().currentUser.uid &&
            randomLabel}
        </Card.Meta>
        <Card.Description>{profile.description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;
