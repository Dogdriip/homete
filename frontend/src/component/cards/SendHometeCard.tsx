import firebase from "firebase/app";
import { useState } from "react";
import { Button, Card, Input, Label, List } from "semantic-ui-react";
import { toast } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";

const SendHometeCard = ({ recipient }): JSX.Element => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  const onSend = async () => {
    setButtonLoading(true);

    if (description.length === 0) {
      toast({
        title: "내용을 입력해 주세요!",
        type: "warning",
        description: "따뜻한 칭찬 한마디 남겨주세요!",
        time: 3000,
        animation: "fade left",
      });
      setButtonLoading(false);
      return;
    }

    if (description.length > 100) {
      toast({
        title: "칭찬이 너무 길어요!",
        type: "warning",
        description: "마음씨가 고우시군요! 여러 번 나눠서 칭찬하는 건 어때요?",
        time: 3000,
        animation: "fade left",
      });
      setButtonLoading(false);
      return;
    }

    try {
      const db = firebase.firestore();
      await db.collection("hometes").doc().set({
        recipient: recipient,
        description: description,
        resolved: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      toast({
        title: "칭찬 완료!",
        type: "success",
        description: "칭찬을 남겼어요.",
        time: 3000,
        animation: "fade left",
      });
      setDescription("");
    } catch (e) {
      console.error("Error writing document: ", e);
    }

    setButtonLoading(false);
  };

  return (
    <Card fluid color="blue">
      <Card.Content>
        <Input
          fluid
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="익명으로 칭찬하기..."
          disabled={buttonLoading}
          action
        >
          <input />
          <Button
            icon="send"
            onClick={() => onSend()}
            loading={buttonLoading}
          />
        </Input>
      </Card.Content>
    </Card>
  );
};

export default SendHometeCard;
