import { useState, useEffect } from "react";
import { Card, List, Label } from "semantic-ui-react";
import LoginWithTwitterButton from "./buttons/LoginWithTwitterButton";
import LogoutButton from "./buttons/LogoutButton";
import { Link } from "react-router-dom";
import { UserProfile } from "../entities/UserProfile";
import LoadingCard from "./cards/LoadingCard";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { useRecoilState } from "recoil";
import { userProfileState } from "../states/userProfileState";

const Home = (): JSX.Element => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);

  return (
    <Card.Group>
      {userProfile === "PENDING" ? (
        <LoadingCard />
      ) : (
        <Card fluid color="blue">
          <Card.Content>
            <Card.Header>트위터로 로그인</Card.Header>
            <Card.Meta>
              트위터로 로그인하면 자신의 페이지를 확인할 수 있어요!
            </Card.Meta>
            <Card.Description>
              {!userProfile ? (
                <LoginWithTwitterButton />
              ) : (
                <p>
                  @{userProfile.screen_name}으로 로그인 완료!{" "}
                  <Link to={"/" + userProfile.screen_name}>자신의 페이지</Link>
                  를 확인해 보세요. <LogoutButton />
                </p>
              )}
            </Card.Description>
          </Card.Content>
        </Card>
      )}

      <Card fluid>
        <Card.Content>
          <Card.Header>어떤 서비스인가요?</Card.Header>
          <Card.Description>
            <TwitterTweetEmbed tweetId={"1365468991657963524"} />
            <List bulleted>
              <List.Item>모두가 칭찬받고 칭찬할 수 있는 플랫폼!</List.Item>
              <List.Item>
                받은 칭찬은 삭제할 수도 있고, 승인할 수도 있어요.
              </List.Item>
              <List.Item>
                승인한 칭찬은 프로필에 나타나고, 트위터에 게시할 수도 있어요.
              </List.Item>
            </List>
          </Card.Description>
        </Card.Content>
      </Card>

      <Card fluid>
        <Card.Content>
          <Card.Header>어떻게 사용하나요?</Card.Header>
          <Card.Description>
            <List bulleted>
              <List.Item>
                트위터로 로그인하기만 하면 가입이 완료되고, 자신의 페이지가
                생겨요.
              </List.Item>
              <List.Item>아직은 미구현된 기능들이 많아요!</List.Item>
            </List>
          </Card.Description>
        </Card.Content>
      </Card>

      <Card fluid>
        <Card.Content>
          <Card.Header>불편 사항 및 건의 접수는요?</Card.Header>
          <Card.Description>
            <List bulleted>
              <List.Item>
                불쾌한 칭찬을 받았거나 칭찬 삭제를 원한다면 개발자{" "}
                <Label
                  as="a"
                  href="https://twitter.com/__Dogdriiiiip"
                  target="_blank"
                >
                  @__Dogdriiiiip
                </Label>{" "}
                에게 연락해 주세요!
              </List.Item>
              <List.Item>
                불편 사항, 가입이 안 되는 버그, 건의 사항 등 서비스에 관한 모든
                연락은 환영입니다!
              </List.Item>
            </List>
          </Card.Description>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default Home;
