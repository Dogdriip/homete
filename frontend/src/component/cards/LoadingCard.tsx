import { Card } from "semantic-ui-react";
import Skeleton from "react-loading-skeleton";

const LoadingCard = () => {
  return (
    <Card fluid color="blue">
      <Card.Content>
        <Card.Header>
          <Skeleton />
        </Card.Header>
        <Card.Description>
          <Skeleton count={3} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default LoadingCard;
