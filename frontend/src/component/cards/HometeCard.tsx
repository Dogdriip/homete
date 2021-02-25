import firebase from "firebase/app";
import { Card, Icon } from "semantic-ui-react";
import { Homete } from "../../entities/Homete";

const HometeCard = ({ recipient, description, timestamp }: Homete) => {
  const timestampStr = timestamp.toDate().toLocaleString();

  return (
    <Card fluid>
      <Card.Content>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="time" /> {timestampStr}
      </Card.Content>
    </Card>
  );
};

export default HometeCard;
