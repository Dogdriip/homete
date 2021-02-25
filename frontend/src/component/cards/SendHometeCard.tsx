import firebase from "firebase/app";
import { useState } from "react";
import { Card, Input } from "semantic-ui-react";
import { UserProfile } from "../../entities/UserProfile";

const SendHometeCard = ({ recipient }) => {
  const [description, setDescription] = useState<string>("");

  const onSend = () => {
    /*
    if (!user || !user.uid) {
      alert("로그인해 주세요!");
      return;
    } */

    const db = firebase.firestore();
    db.collection("hometes")
      .doc()
      .set({
        recipient: recipient,
        description: description,
        resolved: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <Card fluid color="blue">
      <Card.Content>
        <Input
          fluid
          action={{
            icon: "send",
            onClick: onSend,
          }}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="익명으로 칭찬하기..."
        />
      </Card.Content>
    </Card>
  );
};

export default SendHometeCard;
