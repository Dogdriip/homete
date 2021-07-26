import React from "react";
import Head from "next/head";
import Layout from "./components/layout";
import Header from "./components/header";
import Card from "./components/card";

const IndexPage = () => {
  return (
    <Layout>
      <Head>
        <title>homete!</title>
      </Head>

      <header>
        <Header />
      </header>
      <main>
        <Card>
          <h2>어떤 서비스인가요?</h2>
          <blockquote className="twitter-tweet">
            <p lang="ko" dir="ltr">
              이제 막 배운 React와 TypeScript로 첫 프로젝트를 만들어 봤어요!
              모두가 칭찬하고 칭찬받을 수 있는 서비스예요. 트위터로 로그인하면
              자신의 페이지가 생기고, 로그인하지 않아도 익명으로 칭찬을 남길 수
              있어요.{" "}
              <a href="https://t.co/njUPhWStbV">https://t.co/njUPhWStbV</a>
            </p>
            &mdash; 🐶멍드립! (@__Dogdriiiiip){" "}
            <a href="https://twitter.com/__Dogdriiiiip/status/1365468991657963524?ref_src=twsrc%5Etfw">
              February 27, 2021
            </a>
          </blockquote>
          <ul>
            <li>모두가 칭찬받고 칭찬할 수 있는 플랫폼!</li>
            <li>받은 칭찬은 삭제할 수도 있고, 승인할 수도 있어요.</li>
            <li>
              승인한 칭찬은 프로필에 나타나고, 트위터에 게시할 수도 있어요.
            </li>
          </ul>
        </Card>
        <Card>
          <h2>어떻게 사용하나요?</h2>
          <ul>
            <li>
              트위터로 로그인하기만 하면 가입이 완료되고, 자신의 페이지가
              생겨요.
            </li>
            <li>
              로그인하지 않아도 다른 사람의 프로필에서 익명으로 칭찬을 남길 수
              있어요.
            </li>
          </ul>
        </Card>
        <Card>
          <h2>불편 사항 및 건의 접수는요?</h2>
          <ul>
            <li>
              불쾌한 칭찬을 받았거나 칭찬 삭제를 원한다면 개발자 @__Dogdriiiiip
              에게 연락해 주세요!
            </li>
            <li>
              불편 사항, 가입이 안 되는 버그, 건의 사항 등 서비스에 관한 모든
              연락은 환영입니다!
            </li>
          </ul>
        </Card>
      </main>
    </Layout>
  );
};

export default Indexe;
