import Head from "next/head";

import Nav from "./ui/Nav";
import Footer from "./ui/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
				<meta charSet="UTF-8" key="charset" />
        <title>Cursos O4S - Admin</title>
        <meta name="description" content="Administração dos cursos O4S" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
