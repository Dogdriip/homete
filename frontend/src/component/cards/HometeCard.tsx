import firebase from "firebase/app";
import { Button, Card, Icon } from "semantic-ui-react";
import { Homete } from "../../entities/Homete";
import { toast } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";
import { useState } from "react";

const HometeCard = ({
  id,
  recipient,
  description,
  resolved,
  timestamp,
}: Homete) => {
  const timestampStr = timestamp.toDate().toLocaleString();
  const [complete, setComplete] = useState<boolean>(false);

  const onDelete = () => {
    const db = firebase.firestore();
    db.collection("hometes")
      .doc(id)
      .delete()
      .then(() => {
        toast({
          title: "삭제 완료!",
          type: "warning",
          description: "칭찬이 삭제되었습니다.",
          time: 3000,
          animation: "fade left",
        });
        setComplete(true);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  const onResolve = () => {
    const db = firebase.firestore();
    db.collection("hometes")
      .doc(id)
      .update({
        resolved: true,
      })
      .then(() => {
        toast({
          title: "승인 완료!",
          type: "success",
          description: "칭찬이 승인되고 트위터에 게시되었습니다.",
          time: 3000,
          animation: "fade left",
        });
        setComplete(true);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    !complete && (
      <Card fluid>
        <Card.Content>
          <Card.Description>{description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="time" /> {timestampStr} {id}
        </Card.Content>
        {!resolved && (
          <Button.Group>
            <Button negative onClick={() => onDelete()}>
              삭제
            </Button>
            <Button.Or />
            <Button positive onClick={() => onResolve()}>
              승인
            </Button>
          </Button.Group>
        )}
      </Card>
    )
  );
};

export default HometeCard;
