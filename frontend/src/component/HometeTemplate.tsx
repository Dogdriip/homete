import { Container, Header, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./HometeTemplate.scss";

const HometeTemplate = ({ children }: { children: JSX.Element[] }) => {
  return (
    <Container text className="HometeTemplate">
      <Header as="h1">
        <Link to="/" className="header">
          homete!
        </Link>
      </Header>

      <Message info>
        <p>베타 서비스 중입니다!</p>
      </Message>

      {children}
    </Container>
  );
};

export default HometeTemplate;
