import React, { useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { Layout } from "./components/layout";
import { Header } from "./components/header";
import { NormalCard, TemporaryCard } from "./components/card";
import { ProfileContent } from "./components/profile";
import { HometeContent } from "./components/homete";
import { getUserByScreenName } from "../lib/user";
import { User } from "../types/user";
import { getHometesByScreenName } from "../lib/homete";
import { Homete } from "../types/homete";

const UserPage = ({
  user,
  hometes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useEffect(() => {}, []);

  const resolvedHometes: Homete[] = hometes.filter(
    (homete: Homete) => homete.resolved
  );
  const unresolvedHometes: Homete[] = hometes.filter(
    (homete: Homete) => !homete.resolved
  );

  return (
    <Layout>
      <Head>
        <title>homete! - @{user.screen_name}</title>
      </Head>

      <header>
        <Header />
      </header>
      <main>
        <NormalCard key="profile_card">
          <ProfileContent user={user} />
        </NormalCard>
        {unresolvedHometes.map((unresolvedHomete: Homete) => (
          <TemporaryCard key={unresolvedHomete.id}>
            <HometeContent homete={unresolvedHomete} />
          </TemporaryCard>
        ))}
        {resolvedHometes.map((resolvedHomete: Homete) => (
          <NormalCard key={resolvedHomete.id}>
            <HometeContent homete={resolvedHomete} />
          </NormalCard>
        ))}
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  user: User;
  hometes: Homete[];
}> = async (context) => {
  const screenName = context.params?.screenName as string;

  const user: User = await getUserByScreenName(screenName);
  const hometes: Homete[] = await getHometesByScreenName(screenName);

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      hometes: JSON.parse(JSON.stringify(hometes)),
    },
  };
};

export default UserPage;
