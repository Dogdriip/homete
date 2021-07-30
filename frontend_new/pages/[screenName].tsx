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
  const [loadingHometes, setLoadingHometes] = useState<boolean>(false);
  const [resolvedHometes, setResolvedHometes] = useState<Homete[]>([]);
  const [unresolvedHometes, setUnresolvedHometes] = useState<Homete[]>([]);

  const fetchHometes = useCallback(async () => {
    setLoadingHometes(true);

    const hometes: Homete[] = await getHometesByScreenName(user.screen_name);
    setResolvedHometes(hometes.filter((homete: Homete) => homete.resolved));
    setUnresolvedHometes(hometes.filter((homete: Homete) => !homete.resolved));

    setLoadingHometes(false);
  }, [user]);

  useEffect(() => {
    fetchHometes();
  }, [fetchHometes, user]);

  const loadingCard = useMemo(() => {
    return (
      <NormalCenteredCard>
        <p>로딩중...</p>
      </NormalCenteredCard>
    );
  }, []);
  const hometesOrEmptyHometeMessage = useMemo(() => {
    const userIsAuthedAndIsMyPage: boolean =
      authUser !== null && authUser.screen_name === user.screen_name;

    return resolvedHometes.length === 0 && unresolvedHometes.length === 0 ? (
      <NormalCenteredCard>
        <p>아직 받은 칭찬이 없어요...</p>
      </NormalCenteredCard>
    ) : (
      <>
        {userIsAuthedAndIsMyPage &&
          unresolvedHometes.map((unresolvedHomete: Homete) => (
            <TemporaryHometeCard key={unresolvedHomete.id}>
              <HometeContent
                homete={unresolvedHomete}
                fetchHometes={fetchHometes}
              />
            </TemporaryHometeCard>
          ))}
        {resolvedHometes.map((resolvedHomete: Homete) => (
          <NormalHometeCard
            key={resolvedHomete.id}
            onClick={() =>
              router.push(`/${user.screen_name}/${resolvedHomete.id}`)
            }
          >
            <HometeContent
              homete={resolvedHomete}
              fetchHometes={fetchHometes}
            />
          </NormalHometeCard>
        ))}
      </>
    );
  }, [
    authUser,
    user,
    resolvedHometes,
    unresolvedHometes,
    fetchHometes,
    router,
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
          <SendHomete
            recipient={user.screen_name}
            fetchHometes={fetchHometes}
          />
        </NormalCard>
        {loadingHometes ? loadingCard : hometesOrEmptyHometeMessage}
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
