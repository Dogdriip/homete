import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Icon, Popup } from "semantic-ui-react";
import { RootState } from "src/modules";
import { approveAsync, rejectAsync } from "src/modules/hometes";
import { Homete } from "src/types/Homete";

const HometeCard = ({
  id,
  recipient,
  description,
  resolved,
  timestamp,
}: Homete) => {
  const auth = useSelector((state: RootState) => state.auth.auth);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const timestampStr = timestamp.toDate().toLocaleString();

  const onTwitterShare = () => {
    const text = `칭찬받았어요! 😊 — ${description}`;
    const url = `homete.driip.me/${recipient}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURI(
        text,
      )}&url=${url}&hashtags=homete`,
    );
  };

  const onReject = () => {
    dispatch(rejectAsync.request(id));
  };

  const onApprove = () => {
    dispatch(approveAsync.request(id));
    onTwitterShare();
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
            {/* eslint-disable-next-line */}
            <a onClick={() => onTwitterShare()}>
              <Icon name="twitter" />
            </a>
            <Popup
              content={"고유 ID: " + id}
              on="click"
              pinned
              trigger={
                // eslint-disable-next-line
                <a>
                  <Icon name="info circle" />
                </a>
              }
            />
            {/* eslint-disable-next-line */}
            <a
              onClick={() =>
                window.confirm("칭찬을 삭제하시겠어요?") && onReject()
              }
            >
              <Icon name="trash alternate" />
            </a>
          </>
        )}
      </Card.Content>
      {!resolved && (
        <Button.Group>
          <Button negative onClick={onReject}>
            삭제
          </Button>
          <Button.Or />
          <Button positive onClick={onApprove}>
            승인
          </Button>
        </Button.Group>
      )}
    </Card>
  );
};

export default React.memo(HometeCard);
