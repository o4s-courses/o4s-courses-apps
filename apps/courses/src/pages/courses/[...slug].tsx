import { useState, type ReactElement } from "react";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { getServerSession } from "@o4s/auth";
import {
  prisma,
  type Course,
  type Lesson,
  type Post,
  type Subscription,
} from "@o4s/db";

import Banner from "~/components/Banner";
import CourseViewer from "~/components/CourseViewer";
import { Meta } from "~/components/Meta";
import Nav from "~/components/Nav";
import type { NextPageWithLayout } from "~/pages/_app";

type ViewCoursePageProps = {
  course: Course & {
    lessons: (Lesson & {
      post: Post | null;
    })[];
    students: Subscription[];
  };
  completedLessons: number[];
};

const ViewCourse: NextPageWithLayout<ViewCoursePageProps> = ({
  course,
  completedLessons,
}) => {
  const { data: session } = useSession();
  const [lessonProgress, setLessonProgress] = useState(completedLessons);

  return (
    <>
      {!session && (
        <Banner>
          <p className="text-center">
            <Link href="/api/auth/signin" className="underline">
              Sign in
            </Link>{" "}
            to track your progress &rarr;{" "}
          </p>
        </Banner>
      )}
      <CourseViewer
        course={course}
        lessonProgress={lessonProgress}
        setLessonProgress={setLessonProgress}
        role={session?.user.role}
      />
    </>
  );
};

ViewCourse.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Meta title={"Course"} description={"View Course"} />
      <Nav />
      {page}
    </>
  );
};

export default ViewCourse;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context);
  const isStudent = false;

  const id = context?.query?.slug?.[0];
  if (typeof id !== "string") {
    throw new Error("missing id");
  }

  const course = await prisma.course.findUnique({
    where: { id: parseInt(id) },
    include: {
      lessons: {
        include: {
          post: true,
        },
      },
      students: {
        where: { userId: session?.user.id },
        select: {
          userId: true,
        },
      },
    },
  });

  if (!course) {
    return { notFound: true };
  }

  if (course.published === false && course.authorId !== session?.user?.id) {
    return { notFound: true };
  }

  const completedLessons = await prisma.userLessonProgress
    .findMany({
      where: {
        userId: session?.user?.id,
        lessonId: {
          in: course.lessons.map((lesson) => lesson.id),
        },
      },
    })
    .then((progress) => progress.map((p) => p.lessonId));

  /** course.lessons = await Promise.all(course.lessons.map(async (lesson) => {
    if (lesson?.video?.publicPlaybackId) {
      const { blurHashBase64 } = await muxBlurHash(lesson.video.publicPlaybackId);
      (lesson.video as VideoWithPlaceholder).placeholder = blurHashBase64;
    }
    return lesson
  })) */

  return {
    props: {
      session,
      course,
      completedLessons,
    },
  };
};
