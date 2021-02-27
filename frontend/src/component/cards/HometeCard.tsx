import firebase from "firebase/app";
import { Button, Card, Icon, Transition } from "semantic-ui-react";
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
  const [visible, setVisible] = useState<boolean>(true);

  const timestampStr = timestamp.toDate().toLocaleString();

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
        setVisible(false);
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
        // Send to twitter.
        const text = `칭찬받았어요! 😊 — ${description}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURI(text)}`);

        toast({
          title: "승인 완료!",
          type: "success",
          description: "칭찬이 승인되었습니다.",
          time: 3000,
          animation: "fade left",
        });
        setVisible(false);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <Transition visible={visible} animation="fade right" duration={500}>
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
    </Transition>
  );
};

export default HometeCard;
