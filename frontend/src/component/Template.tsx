import { Container, Header, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Template.scss";

const Template = ({ children }: { children: JSX.Element[] }) => {
  return (
    <Container text className="Template">
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

export default Template;
