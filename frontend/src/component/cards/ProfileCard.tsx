import { Card, Image, Label, Grid } from "semantic-ui-react";
import { UserProfile } from "../../entities/UserProfile";

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
        <Card.Header as="h1" style={{ "margin-top": 5 }}>
          {profile.name}
        </Card.Header>
        <Card.Meta>
          <Label>@{profile.screen_name}</Label>
        </Card.Meta>
        <Card.Description>{profile.description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;
