import Image from "next/image";
import Link from "next/link";
import type { GetServerSideProps, NextPage } from "next/types";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import { getServerSession, type Session } from "@o4s/auth";
import { prisma, type Course, type Lesson, type Post } from "@o4s/db";

import Heading from "~/components/Heading";
import CourseForm, { type Inputs } from "~/components/forms/CourseForm";

type AdminCourseEditPageProps = {
  session: Session;
  course: Course & {
    lessons: (Lesson & {
      post: Post | null;
    })[];
  };
};

type CourseUpdateResult = {
  id: number;
};

const AdminCourseEdit: NextPage<AdminCourseEditPageProps> = ({ course }) => {
  const { data: session } = useSession();

  const handler = (data: Inputs) => {
    return fetch(`/api/courses/${course.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }).then((res) => res.json());
  };

  const mutation = useMutation(handler, {
    onSuccess: (data: CourseUpdateResult) => {
      toast.success("Course updated successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Something went wrong");
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    mutation.mutate(data);
  };

  if (session?.user.role === "admin") {
    return (
      <div className="grid md:grid-cols-2">
        <div>
          <Heading as="h2">{course.name}</Heading>
          <CourseForm
            onSubmit={onSubmit}
            course={course}
            isLoading={mutation.isLoading}
          />
        </div>

        <div>
          <Heading as="h4">Lessons</Heading>
          {course.lessons.length > 0 ? (
            <>
              {course.lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/admin/courses/${course.id}/lessons/${lesson.id}`}
                  className="mb-6 flex cursor-pointer gap-4 rounded-lg border border-gray-200"
                >
                  {lesson.post?.coverImage && (
                    <Image
                      src={`${lesson.post?.coverImage}`}
                      alt={`Lesson thumbnail preview for ${lesson.name}`}
                      width={180}
                      height={100}
                    />
                  )}
                  <div className="py-2">
                    <Heading as="h5">{lesson.name}</Heading>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <div>
              <h2>None yet.</h2>
            </div>
          )}

          <div className="btm-nav">
            <Link
              href={`/admin/courses/${course.id}/lessons/new`}
              legacyBehavior
            >
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <line
                    fill="none"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="12"
                    x2="12"
                    y1="19"
                    y2="5"
                  />
                  <line
                    fill="none"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="5"
                    x2="19"
                    y1="12"
                    y2="12"
                  />
                </svg>
                <span className="btm-nav-label">Add a lesson</span>
              </button>
            </Link>
            <button className="active">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="btm-nav-label">Warnings</span>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span className="btm-nav-label">Statics</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <p>Access Denied</p>;
};

export default AdminCourseEdit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const id = context?.params?.courseId;
  if (typeof id !== "string") {
    throw new Error("missing id");
  }

  const [course] = await prisma.course.findMany({
    where: {
      id: parseInt(id),
      author: {
        email: session.user?.email,
      },
    },
    include: {
      lessons: {
        include: {
          post: true,
        },
      },
    },
  });

  if (!course) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      session,
      course,
    },
  };
};
