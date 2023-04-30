import { AppConfig } from "@o4s/app-config";

import Footer from "./Footer";
import { Meta } from "./Meta";
import Nav from "./Nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Nav />
      <main className="mx-auto min-h-screen max-w-full px-5 md:max-w-6xl">
        {children}
      </main>
      <Footer />
    </>
  );
}
