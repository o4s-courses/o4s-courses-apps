import Head from "next/head";
import { NextSeo } from "next-seo";

import Footer from "./ui/Footer";
import Navbar from "./ui/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <title>Projeto Ser Sustentável - O4S - Open For Sustainability</title>
        <meta
          name="Projeto Ser Sustentável - O4S - Open For Sustainability"
          content="Cursos online de Introdução à Permacultura e Introdução à Agricultura Biodinâmica."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo
        title="Projeto Ser Sustentável - O4S - Open For Sustainability"
        description="Cursos online de Introdução à Permacultura e Introdução à Agricultura Biodinâmica."
        canonical=""
        openGraph={{
          title: "Projeto Ser Sustentável - O4S - Open For Sustainability",
          description:
            "Cursos online de Introdução à Permacultura e Introdução à Agricultura Biodinâmica.",
          url: "http://localhost:3000",
          locale: "pt_PT",
          site_name: "Cursos Online O4S",
        }}
      />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
