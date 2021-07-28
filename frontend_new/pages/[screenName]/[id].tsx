import React, { useCallback, useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layout } from "../components/layout";
import { Header } from "../components/header";
import { Homete } from "../../types/homete";
import { getHometeById } from "../../lib/homete";
import { NormalCard } from "../components/card";
import { HometeContent } from "../components/homete";

const HometePage = ({
  homete,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>homete! - {homete.id}번 칭찬</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:url" content="" />
        <meta
          property="og:title"
          content={`@${homete.recipient}님은 칭찬받았어요!`}
        />
        <meta property="og:description" content={homete.description} />
        <meta property="og:image" content={`/api/hometeImage/${homete.id}`} />
      </Head>

      <header>
        <Header />
      </header>
      <main>
        <NormalCard key={homete.id}>
          <HometeContent homete={homete} />
        </NormalCard>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  homete: Homete;
}> = async (context) => {
  const id = context.params?.id as string;

  const homete: Homete = await getHometeById(id);

  return {
    props: {
      homete: JSON.parse(JSON.stringify(homete)),
    },
  };
};

export default HometePage;
