import React, { useCallback, useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "../../components/layout";
import { Header } from "../../components/header";
import { Homete } from "../../types/homete";
import { getHometeById } from "../../lib/homete";
import { NormalCard } from "../../components/card";
import { HometeContent } from "../../components/homete";

const HometePage = ({
  homete,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <Head>
        <title>homete! - {homete.id}번 칭찬</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:url"
          content={`https://homete.driip.me/${homete.recipient}/${homete.id}`}
        />
        <meta
          property="og:title"
          content={`@${homete.recipient}님은 칭찬받았어요!`}
        />
        <meta
          property="og:image"
          content={`https://homete.driip.me/api/hometeImage/${homete.id}`}
        />
      </Head>

      <header>
        <Header />
      </header>
      <main>
        <NormalCard key={homete.id}>
          <HometeContent homete={homete} />
        </NormalCard>
        <Link href={`/${homete.recipient}`}>
          <a>&lt; 목록으로 돌아가기</a>
        </Link>
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
