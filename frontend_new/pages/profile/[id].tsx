import React from "react";
import Head from "next/head";
import Layout from "../components/layout";
import Header from "../components/header";
import Card from "../components/card";

const Home: React.ReactNode = () => {
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
          <h2>asdf</h2>
        </Card>
      </main>
    </Layout>
  );
};

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}

export default Home;
