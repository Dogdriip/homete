import React from "react";
import { Card, Placeholder } from "semantic-ui-react";

const LoadingCard: React.FC = () => {
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

export default React.memo(LoadingCard);
