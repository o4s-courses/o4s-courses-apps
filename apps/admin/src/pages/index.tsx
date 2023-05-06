import SectionWrapper from "~/components/SectionWrapper";
import { type GetServerSideProps, type NextPage } from 'next/types';
import { getServerSession, type Session } from "@o4s/auth";
import { api, type RouterOutputs } from "~/utils/api";

import Header from "~/components/ui/Header";
import Nav from "~/components/ui/Nav";
import TableCourses from "~/components/TableCourses";
import Stats from "~/components/ui/Stats";
import HomeHeader from "~/components/ui/HomeHeader";

type Props = {
	session: Session;
	isAdmin: boolean;
};

const Home: NextPage<Props> = ({ isAdmin }) => {
	const { data: session } = api.auth.getSession.useQuery();

	return (
		<><Header title="Cursos - Admin" />
			<Nav />
			<SectionWrapper className="mt-0">
				<Stats />
				<HomeHeader />
				<TableCourses />
			</SectionWrapper>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getServerSession(context);

	if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  };

	const isAdmin = session.user.role === "admin";

	if (!isAdmin) {
    return {
      redirect: {
        destination: "/unauthorized",
        permanent: false,
      },
    };
  };

	return {
    props: {
			session,
      isAdmin,
    },
  };

};

export default Home;