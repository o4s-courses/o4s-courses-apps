/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import SectionWrapper from "~/components/SectionWrapper";
import { type GetServerSideProps, type NextPage } from 'next/types';
import { getServerSession, type Session } from "@o4s/auth";
import { api, type RouterOutputs } from "~/utils/api";

import Header from "~/components/ui/Header";
import Nav from "~/components/ui/Nav";
import Footer from "~/components/ui/Footer";

type Props = {
	session: Session;
	isAdmin: boolean;
};

const CourseCard: React.FC<{
  course: RouterOutputs["course"]["all"][number];
  onCourseDelete?: () => void;
}> = ({ course, onCourseDelete }) => {
  return (
    <div className="flex flex-row rounded-lg bg-white/10 p-4 transition-all hover:scale-[101%]">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-pink-400">{course.name}</h2>
        <p className="mt-2 text-sm">{course.description}</p>
				<p className="mt-2 text-sm">Lessons: {course._count.lessons}</p>
				<p className="mt-2 text-sm">Students: {course._count.students}</p>
      </div>
      <div>
        <span
          className="cursor-pointer text-sm font-bold uppercase text-pink-400"
          onClick={onCourseDelete}
        >
          Delete
        </span>
      </div>
    </div>
  );
};

const Home: NextPage<Props> = ({ isAdmin }) => {
	const { data: session } = api.auth.getSession.useQuery();
  const courseQuery = api.course.byAuthor.useQuery();

	const deleteCourseMutation = api.course.delete.useMutation({
    onSettled: () => courseQuery.refetch(),
  });


	return (
		<><Header title="Cursos - Admin" />
			<Nav />
			<SectionWrapper className="mt-12 dark:mt-0">
				

					{courseQuery.data ? (
            <div className="w-full max-w-2xl">
              {courseQuery.data?.length === 0 ? (
                <span>There are no courses!</span>
              ) : (
                <div className="flex h-[40vh] justify-center overflow-y-scroll px-4 text-2xl">
                  <div className="flex w-full flex-col gap-4">
                    {courseQuery.data?.map((p) => {
                      return (
                        <CourseCard
                          key={p.id}
                          course={p}
                          onCourseDelete={() => deleteCourseMutation.mutate(p.id)}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}

			</SectionWrapper>
			<Footer />
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