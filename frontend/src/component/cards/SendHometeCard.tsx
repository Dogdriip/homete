import firebase from "firebase/app";
import { useState } from "react";
import { Card, Input } from "semantic-ui-react";
import { toast } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";

const SendHometeCard = ({ recipient }) => {
  const [description, setDescription] = useState<string>("");

  const onSend = () => {
    if (description.length === 0) {
      toast({
        title: "내용을 입력해 주세요!",
        type: "warning",
        description: "따뜻한 칭찬 한마디 남겨주세요!",
        time: 3000,
        animation: "fade left",
      });
      return;
    }

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
        toast({
          title: "칭찬 완료!",
          type: "success",
          description: "칭찬을 남겼어요.",
          time: 3000,
          animation: "fade left",
        });
        setDescription("");
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
          type="text"
          action={{
            icon: "send",
            onClick: onSend,
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="익명으로 칭찬하기..."
        />
      </Card.Content>
    </Card>
  );
};

export default SendHometeCard;
