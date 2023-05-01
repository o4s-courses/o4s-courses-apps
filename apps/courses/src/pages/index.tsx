import type { GetServerSideProps, NextPage } from "next/types";

import { getServerSession, type Session } from "@o4s/auth";
import { prisma, type Course, type Subscription } from "@o4s/db";

import CourseGrid from "~/components/CourseGrid";
import Heading from "~/components/Heading";

type HomePageProps = {
  session: Session;
  courses: (Course & {
    students: Subscription[];
  })[];
};

const Home: NextPage<HomePageProps> = ({ courses }) => {
  return (
    <>
      {courses.length > 0 ? (
        <Heading>View these sustainability courses</Heading>
      ) : (
        <Heading>There are no courses to view</Heading>
      )}
      {courses.find((course) => course.published === false) && (
        <Heading as="h4">Draft courses are only visible to you</Heading>
      )}
      <CourseGrid courses={courses} />
    </>
  );
};

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
  } else {
    userId = session.user.id;
  }

  const courses = await prisma.course.findMany({
    where: {
      OR: [
        {
          published: true,
        },
        {
          author: {
            id: userId,
          },
        },
      ],
    },
    include: {
      students: {
        where: { userId: userId },
        select: {
          userId: true,
        },
      },
    },
  });

  console.log(JSON.stringify(courses, null, 2));

  return {
    props: {
      session,
      courses,
    },
  };
};
