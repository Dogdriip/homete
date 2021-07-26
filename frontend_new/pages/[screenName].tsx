import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Layout from "./components/layout";
import Header from "./components/header";
import Card from "./components/card";
import Profile from "./components/profile";
import { getAllUserScreenNames, getUserByScreenName } from "../lib/user";
import { User } from "../types/user";

const UserPage = ({ userData }: { userData: User }) => {
  return (
    <Layout>
      <Head>
        <title>homete! - @{userData.screen_name}</title>
      </Head>

      <header>
        <Header />
      </header>
      <main>
        <Card>
          <Profile userData={userData} />
        </Card>
      </main>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllUserScreenNames();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const userData = await getUserByScreenName(
    params?.screenName as User["screen_name"]
  );
  return {
    props: {
      userData,
    },
  };
};

export default UserPage;
