import firebase from "firebase/app";
import { Button, Card, Icon } from "semantic-ui-react";
import { Homete } from "../../entities/Homete";

const HometeCard = ({
  recipient,
  description,
  resolved,
  timestamp,
}: Homete) => {
  const timestampStr = timestamp.toDate().toLocaleString();

  return (
    <Card fluid>
      <Card.Content>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="time" /> {timestampStr}
      </Card.Content>
      {!resolved && (
        <Button.Group>
          <Button negative>삭제</Button>
          <Button.Or />
          <Button positive>승인</Button>
        </Button.Group>
      )}
    </Card>
  );
};

export default HometeCard;
