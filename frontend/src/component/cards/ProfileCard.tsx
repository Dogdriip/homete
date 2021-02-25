import firebase from "firebase/app";
import { Card, Image, Label } from "semantic-ui-react";
import { UserProfile } from "../../entities/UserProfile";

const ProfileCard = (profile: UserProfile) => {
  return (
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
  );
};

export default ProfileCard;
