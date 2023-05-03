import type { GetServerSideProps, NextPage } from "next/types";
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

	if (session.user.role !== 'admin') {
		return {
      redirect: {
        destination: "/unauthorized",
        permanent: false,
      },
    };
	};

  const courseQuery = api.course.byAuthor.useQuery();

	const deleteCourseMutation = api.course.delete.useMutation({
    onSettled: () => courseQuery.refetch(),
  });

	return (

	);
}

export default Home;