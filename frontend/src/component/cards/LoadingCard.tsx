import { Card } from "semantic-ui-react";

const LoadingCard = () => {
  return (
    <Card fluid color="blue">
      <Card.Content>
        <Card.Header>로딩중...</Card.Header>
      </Card.Content>
    </Card>
  );
};

export default LoadingCard;
