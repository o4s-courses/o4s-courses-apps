import { type NextPage } from "next/types";
import SectionWrapper from "~/components/SectionWrapper";
import { api, type RouterOutputs } from "~/utils/api";

const Home: NextPage = () => {
	const { data: session } = api.auth.getSession.useQuery();

	if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  };

	if (!(session.user.role === "admin")) {
		return {
      redirect: {
        destination: "/unauthorized",
        permanent: false,
      },
    };
	};

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const courseQuery = api.course.byAuthor.useQuery();


	return (
		<SectionWrapper className="mt-12 dark:mt-0">
			
		</SectionWrapper>

	);
};

export default Home;