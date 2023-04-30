import { type GetServerSideProps, type NextPage } from "next";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { getServerSession, type Session } from "@o4s/auth";
import { prisma, type Course, type Subscription } from "@o4s/db";

import AdminStats from "~/components/AdminStats";
import Button from "~/components/Button";
import CourseGrid from "~/components/CourseGrid";
import Heading from "~/components/Heading";

type AdminIndexPageProps = {
  session: Session;
  courses: (Course & {
    students: Subscription[];
  })[];
};

const AdminIndex: NextPage<AdminIndexPageProps> = ({ courses }) => {
  const { data: session } = useSession();

  if (session?.user.role === "admin") {
    return (
      <>
        <Heading>Admin</Heading>
        <AdminStats />
        <Heading as="h2">Your courses</Heading>

        {courses.length > 0 ? (
          <CourseGrid courses={courses} isAdmin />
        ) : (
          <div>
            <Heading as="h3">You don&apos;t have any courses yet.</Heading>
          </div>
        )}

        <Link href="/admin/courses/new" legacyBehavior>
          <Button>Create a course</Button>
        </Link>
      </>
    );
  }
  return <p>Access Denied</p>;
};

export default AdminIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context);
  let userId = "";

  if (session) {
    userId = session.user.id;
  }

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const courses = await prisma.course.findMany({
    where: {
      author: {
        id: userId,
      },
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

  return {
    props: {
      session,
      courses,
    },
  };
};
