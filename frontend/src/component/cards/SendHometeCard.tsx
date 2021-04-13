import React, { KeyboardEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-semantic-toasts";
import { Button, Card, Input, Progress } from "semantic-ui-react";
import { RootState } from "src/modules";
import { sendAsync as sendHometeAsync } from "src/modules/hometes";
import { DeepReadonlyObject } from "src/types/DeepReadonly";

type SendHometeCardProps = DeepReadonlyObject<{
  recipient: string;
}>;

const SendHometeCard: React.FC<SendHometeCardProps> = ({
  recipient,
}: SendHometeCardProps) => {
  const loading = useSelector((state: RootState) => state.hometes.loading.SEND);
  const [description, setDescription] = useState<string>("");
  const dispatch = useDispatch();

  const onSend = async () => {
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

    if (description.length > 100) {
      toast({
        title: "칭찬이 너무 길어요!",
        type: "warning",
        description: "마음씨가 고우시군요! 여러 번 나눠서 칭찬하는 건 어때요?",
        time: 3000,
        animation: "fade left",
      });
      return;
    }

    dispatch(sendHometeAsync.request({ recipient, description }));
    setDescription("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      onSend();
    }
  };

  return (
    <Card fluid color="blue">
      <Card.Content>
        <Input
          fluid
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="익명으로 칭찬하기..."
          disabled={loading}
          action
        >
          <input />
          <Button icon="send" onClick={() => onSend()} loading={loading} />
        </Input>
        <Progress
          value={description.length}
          total={100}
          size="tiny"
          warning={description.length > 60}
          error={description.length > 80}
          style={{ marginTop: "10px" }}
        >
          {description.length} / 100글자
        </Progress>
      </Card.Content>
    </Card>
  );
};

export default React.memo(SendHometeCard);
