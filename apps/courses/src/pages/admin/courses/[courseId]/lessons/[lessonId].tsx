import { useRouter } from "next/router";
import type { GetServerSideProps, NextPage } from "next/types";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import { getServerSession, type Session } from "@o4s/auth";
import { prisma, type Lesson, type Post } from "@o4s/db";

import Button from "~/components/Button";
import LessonBody from "~/components/LessonBody";
import LessonForm, { type Inputs } from "~/components/forms/LessonForm";

type AdminLessonEditPageProps = {
  session: Session;
  lesson: Lesson & {
    post: Post | null;
  };
};

const AdminLessonEdit: NextPage<AdminLessonEditPageProps> = ({ lesson }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const updateLesson = (data: Inputs) => {
    return fetch(`/api/lessons/${lesson.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }).then((res) => res.json());
  };

  const deleteLesson = () => {
    return fetch(`/api/lessons/${lesson.id}`, { method: "DELETE" });
  };

  const updateMutation = useMutation(updateLesson, {
    onSuccess: () => {
      toast.success("Lesson updated successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Something went wrong");
    },
  });

  const deleteMutation = useMutation(deleteLesson, {
    onSuccess: () => {
      void router.push(`/admin/courses/${lesson.courseId}`);
      toast.success("Lesson deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Something went wrong");
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    updateMutation.mutate(data);
  };

  if (session) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          {lesson?.post?.postId ? (
            <LessonBody content={lesson?.post?.html} />
          ) : (
            <div className="mb-6 w-full bg-gray-200" />
          )}

          <Button onClick={deleteMutation.mutate}>Delete this lesson</Button>
        </div>
        <div>
          <LessonForm
            onSubmit={onSubmit}
            lesson={lesson}
            isLoading={updateMutation.isLoading}
          />
        </div>
      </div>
    );
  }
  return <p>Access Denied</p>;
};

export default AdminLessonEdit;

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

  const id = context?.params?.lessonId;
  if (typeof id !== "string") {
    throw new Error("missing id");
  }

  const [lesson] = await prisma.lesson.findMany({
    where: {
      id: parseInt(id),
      course: {
        author: {
          id: session.user?.id,
        },
      },
    },
    include: {
      post: true,
    },
  });

  if (!lesson) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      session,
      lesson,
    },
  };
};
