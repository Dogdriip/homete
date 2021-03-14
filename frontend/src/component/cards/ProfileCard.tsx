import { Button, Card, Image, Label, Popup } from "semantic-ui-react";
import { UserProfile } from "../../entities/UserProfile";
import firebase from "firebase/app";
import { useEffect, useState } from "react";
import { JsxEmit } from "typescript";

const randomLabelArr = [
  <Label color="orange">귀여운 아타시!</Label>,
  <Label color="blue">멋있는 나님!</Label>,
  <Label color="pink">깜찍한 와타시!</Label>,
];
const randomLabel =
  randomLabelArr[Math.floor(Math.random() * randomLabelArr.length)];

const getContributor = async (username: string): Promise<string | null> => {
  const db = firebase.firestore();
  const querySnapshot = await db
    .collection("contributors")
    .where("screen_name", "==", username)
    .get();

  if (querySnapshot.empty) {
    return null;
  } else {
    const description = querySnapshot.docs[0].data().description;
    return description;
  }
};

const ProfileCard = (profile: UserProfile) => {
  const [profileImg, setProfileImg] = useState<JSX.Element>(null);

  useEffect(() => {
    getContributor(profile.screen_name).then((data) => {
      if (data) {
        setProfileImg(
          <Popup
            content={data}
            trigger={
              <Image
                floated="left"
                size="tiny"
                circular
                src={profile.profile_image_url_https}
                style={{ boxShadow: "rgb(255 215 0 / 80%) 0px 4px 10px 0px" }}
              />
            }
          />,
        );
      } else {
        setProfileImg(
          <Image
            floated="left"
            size="tiny"
            circular
            src={profile.profile_image_url_https}
          />,
        );
      }
    });
  }, []);

  return (
    <Card fluid color="blue">
      <Card.Content>
        {profileImg}
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
