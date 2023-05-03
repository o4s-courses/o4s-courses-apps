import type { GetServerSideProps, NextPage } from "next/types";
import { getServerSession, type Session } from "@o4s/auth";
import { api, type RouterOutputs } from "~/utils/api";

type Props = {
  session: Session;
  courses: {
    id: number;
		name: string;
		description: string;
		published: boolean;
  }[];
};

const Home: NextPage<Props> = ({ courses }) => {
  const courseQuery = api.course.byAuthor.useQuery();

	const deleteCourseMutation = api.course.delete.useMutation({
    onSettled: () => courseQuery.refetch(),
  });

	return (

	);
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context);
  let userId = "";

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

	const courses = api.course.byAuthor.useQuery();

  return {
    props: {
      session,
      courses,
    },
  };
};