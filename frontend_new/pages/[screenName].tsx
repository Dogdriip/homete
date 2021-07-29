import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layout } from "../components/layout";
import { Header } from "../components/header";
import {
  NormalCard,
  NormalCenteredCard,
  NormalHometeCard,
  TemporaryHometeCard,
} from "../components/card";
import { ProfileContent } from "../components/profile";
import { HometeContent, SendHomete } from "../components/homete";
import { getUserByScreenName } from "../lib/user";
import { User } from "../types/user";
import { getHometesByScreenName } from "../lib/homete";
import { Homete } from "../types/homete";
import useFirebaseTwitterAuth from "../hooks/useFirebaseTwitterAuth";

const UserPage = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { user: authUser } = useFirebaseTwitterAuth();
  const [hometes, setHometes] = useState<Homete[] | null>(null);
  const [resolvedHometes, setResolvedHometes] = useState<Homete[]>([]);
  const [unresolvedHometes, setUnresolvedHometes] = useState<Homete[]>([]);

  useEffect(() => {
    const fetchHometes = async () => {
      const hometes: Homete[] = await getHometesByScreenName(user.screen_name);
      setHometes(hometes);
      setResolvedHometes(hometes.filter((homete: Homete) => homete.resolved));
      setUnresolvedHometes(
        hometes.filter((homete: Homete) => !homete.resolved)
      );
    };
    fetchHometes();
  }, [user]);

  const loadingCard = useMemo(() => {
    return (
      <NormalCenteredCard>
        <p>로딩중...</p>
      </NormalCenteredCard>
    );
  }, []);
  const hometesOrEmptyHometeMessage = useMemo(() => {
    return hometes?.length === 0 ? (
      <NormalCenteredCard>
        <p>아직 받은 칭찬이 없어요...</p>
      </NormalCenteredCard>
    ) : (
      <>
        {authUser?.screen_name === user.screen_name &&
          unresolvedHometes.map((unresolvedHomete: Homete) => (
            <TemporaryHometeCard key={unresolvedHomete.id}>
              <HometeContent homete={unresolvedHomete} />
            </TemporaryHometeCard>
          ))}
        {resolvedHometes.map((resolvedHomete: Homete) => (
          <NormalHometeCard
            key={resolvedHomete.id}
            onClick={() =>
              router.push(`/${user.screen_name}/${resolvedHomete.id}`)
            }
          >
            <HometeContent homete={resolvedHomete} />
          </NormalHometeCard>
        ))}
      </>
    );
  }, [
    hometes,
    resolvedHometes,
    router,
    unresolvedHometes,
    user.screen_name,
    authUser,
  ]);

  return (
    <Layout>
      <Head>
        <title>homete! - @{user.screen_name}</title>
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:url"
          content={`https://homete.driip.me/${user.screen_name}`}
        />
        <meta
          property="og:title"
          content={`@${user.name}님에게 칭찬해 주세요!`}
        />
      </Head>

      <header>
        <Header />
      </header>
      <main>
        <NormalCard key="profile_card">
          <ProfileContent user={user} />
        </NormalCard>
        <NormalCard key="send_homete_card">
          <SendHomete recipient={user.screen_name} />
        </NormalCard>
        {hometes === null ? loadingCard : hometesOrEmptyHometeMessage}
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  user: User;
}> = async (context) => {
  const screenName = context.params?.screenName as string;

  const user: User = await getUserByScreenName(screenName);

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};

export default UserPage;
