"use client";

import Nav from "~/app/components/Nav";
import Footer from "~/app/components/Footer";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
			<Nav />
				{children}
			<Footer />
    </section>
  );
}