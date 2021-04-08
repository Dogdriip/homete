import { useSelector } from "react-redux";
import { Button, Card, Icon, Popup } from "semantic-ui-react";
import { RootState } from "../../modules";
import { Homete } from "../../types/Homete";

const HometeCard = ({
  id,
  recipient,
  description,
  resolved,
  timestamp,
}: Homete) => {
  const auth = useSelector((state: RootState) => state.auth.auth);
  const user = useSelector((state: RootState) => state.user.user);

  const timestampStr = timestamp.toDate().toLocaleString();

  const onDelete = () => {};

  const onResolve = () => {};

  const onTwitterShare = () => {
    const text = `칭찬받았어요! 😊 — ${description}`;
    const url = `homete.driip.me/${recipient}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURI(
        text,
      )}&url=${url}&hashtags=homete`,
    );
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="time" /> {timestampStr}{" "}
        {auth && auth.uid === user.uid && resolved && (
          <>
            <br />
            <a onClick={() => onTwitterShare()}>
              <Icon name="twitter" />
            </a>
            <Popup
              content={"고유 ID: " + id}
              on="click"
              pinned
              trigger={
                <a>
                  <Icon name="info circle" />
                </a>
              }
            />
            <a
              onClick={() =>
                window.confirm("칭찬을 삭제하시겠어요?") && onDelete()
              }
            >
              <Icon name="trash alternate" />
            </a>
          </>
        )}
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
  );
};

export default HometeCard;
