import React from "react";
import "./App.css";
import {
  Container,
  Header,
  Card,
  Button,
  Icon,
  Message,
  Image,
  Label,
  Segment,
} from "semantic-ui-react";

const App = () => (
  <Container text style={{ margin: 20 }}>
    <Header as="h1">homete!</Header>
    <Message info>
      <p>알파 서비스 중입니다!</p>
    </Message>
    <Card.Group centered>
      <Card fluid color="blue">
        <Card.Content>
          <Card.Header>트위터로 로그인</Card.Header>
          <Card.Meta>트위터로 로그인해야 서비스를 사용할 수 있어요!</Card.Meta>
          <Card.Description>
            <Button color="twitter">
              <Icon name="twitter" /> Sign in with Twitter
            </Button>
          </Card.Description>
        </Card.Content>
      </Card>

      <Card fluid color="blue">
        <Card.Content>
          <Card.Header>트위터로 로그인</Card.Header>
          <Card.Meta>트위터로 로그인해야 서비스를 사용할 수 있어요!</Card.Meta>
          <Card.Description>
            로그인 완료! 자신의 페이지를 확인해 보세요. 로그아웃
          </Card.Description>
        </Card.Content>
      </Card>

      <Card fluid color="blue">
        <Card.Content>
          <Card.Header>어떤 서비스인가요?</Card.Header>
          <Card.Description>저도 몰라요!</Card.Description>
        </Card.Content>
      </Card>

      <Card fluid color="blue">
        <Card.Content>
          <Image
            floated="left"
            size="tiny"
            circular
            src="https://via.placeholder.com/150"
          />
          <Card.Header>Username</Card.Header>
          <Card.Meta>
            <Label>
              <Icon name="at" />
              <Label.Detail>username</Label.Detail>
            </Label>
          </Card.Meta>
          <Card.Description>
            <p>description</p>
          </Card.Description>
        </Card.Content>
      </Card>

      <Card fluid color="blue">
        <Card.Content>
          <Card.Header>사용자 설정</Card.Header>
          <Card.Meta>자신의 페이지에서만 보입니다.</Card.Meta>
          <Card.Description>
            <Card.Group>
              <Card fluid>
                <Card.Content>
                  <Card.Header>후원 계좌 설정</Card.Header>
                  <Card.Description>description</Card.Description>
                </Card.Content>
              </Card>
              <Card fluid>
                <Card.Content>
                  <Card.Header>후원 계좌 설정</Card.Header>
                  <Card.Description>description</Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Card.Description>
        </Card.Content>
      </Card>
    </Card.Group>

    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Card.Description>
            <Label color="red" horizontal>
              1.000000 BTC
            </Label>
            드립님 너무 멋져요
          </Card.Description>
        </Card.Content>
      </Card>
      <Card fluid>
        <Card.Content>
          <Card.Description>
            <Label color="red" horizontal>
              1.000000 BTC
            </Label>
            드립님 너무 멋져요
          </Card.Description>
        </Card.Content>
      </Card>
      <Card fluid>
        <Card.Content>
          <Card.Description>
            <Label color="red" horizontal>
              1.000000 BTC
            </Label>
            드립님 너무 멋져요
          </Card.Description>
        </Card.Content>
      </Card>
    </Card.Group>
  </Container>
);

export default App;
