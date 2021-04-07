import { Card, Placeholder } from "semantic-ui-react";

const LoadingCard = () => {
  return (
    <Card fluid color="blue">
      <Card.Content>
        <Placeholder fluid>
          <Placeholder.Header>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      </Card.Content>
    </Card>
  );
};

export default LoadingCard;
