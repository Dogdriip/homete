import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Profile from "./component/Profile";
import { Container } from "semantic-ui-react";

const App = () => {
  return (
    <Container text style={{ margin: 20 }}>
      <Route path="/" component={Home} exact />
      <Route path="/:username" component={Profile} exact />
    </Container>
  );

  /*
  return (
    <Container text style={{ margin: 20 }}>
      <Header as="h1">homete!</Header>
      <Message info>
        <p>알파 서비스 중입니다!</p>
      </Message>
      <Card.Group centered>
        {!state.isAuthenticated ? (
          <Card fluid color="blue">
            <Card.Content>
              <Card.Header>트위터로 로그인</Card.Header>
              <Card.Meta>
                트위터로 로그인해야 서비스를 사용할 수 있어요!
              </Card.Meta>
              <Card.Description>
                <Button color="twitter" onClick={onLogin}>
                  <Icon name="twitter" /> Sign in with Twitter
                </Button>
              </Card.Description>
            </Card.Content>
          </Card>
        ) : (
          <>
            <Card fluid color="blue">
              <Card.Content>
                <Card.Header>트위터로 로그인</Card.Header>
                <Card.Meta>
                  트위터로 로그인해야 서비스를 사용할 수 있어요!
                </Card.Meta>
                <Card.Description>
                  로그인 완료! 자신의 페이지를 확인해 보세요.{" "}
                  <a onClick={onLogout}>로그아웃</a>
                </Card.Description>
              </Card.Content>
            </Card>
            <Card fluid color="blue">
              <Card.Content>
                <Image
                  floated="left"
                  size="tiny"
                  circular
                  src={state.user.profile_image_url}
                />
                <Card.Header as="h1">{state.user.name}</Card.Header>
                <Card.Meta>
                  <Label>@{state.user.screen_name}</Label>
                </Card.Meta>
                <Card.Description>{state.user.description}</Card.Description>
              </Card.Content>
            </Card>
          </>
        )}

        <Card fluid color="blue">
          <Card.Content>
            <Card.Header>어떤 서비스인가요?</Card.Header>
            <Card.Description>저도 몰라요!</Card.Description>
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
            <Card.Description>드립님 너무 멋져요</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name="time" />
            1시간 전
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Description>드립님 너무 멋져요</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name="time" />
            1시간 전
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Description>드립님 너무 멋져요</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name="time" />
            1시간 전
          </Card.Content>
        </Card>
      </Card.Group>
    </Container>
  );

  */
};

export default App;
