// import { useState } from 'react'
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import { getServerSession, type Session } from "@o4s/auth";
import { prisma } from "@o4s/db";

import Heading from "~/components/Heading";
import SubmitInput from "~/components/forms/SubmitInput";
import TextAreaInput from "~/components/forms/TextAreaInput";
import TextInput from "~/components/forms/TextInput";

// import Field from 'components/forms/Field'
// import SubmitInput from 'components/forms/SubmitInput'

type Inputs = {
  name: string;
  description: string;
  postId: string;
  courseId: string;
};

type AdminNewLessonPageProps = {
  session: Session;
  postId: string;
};

type LessonCreateResult = {
  id: number;
};

const AdminNewLesson: NextPage<AdminNewLessonPageProps> = ({ postId }) => {
  const router = useRouter();
  const courseId = router.query.courseId as string;

  const methods = useForm<Inputs>();

  const handler = (data: Inputs) => {
    return fetch("/api/lessons", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => res.json());
  };

  const mutation = useMutation(handler, {
    onSuccess: (data: LessonCreateResult) => {
      router.push(`/admin/courses/${courseId}/lessons/${data.id}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Something went wrong");
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Heading>New lesson</Heading>
      <FormProvider {...methods}>
        <form
          className="flex max-w-xl flex-col"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <TextInput label="Name" name="name" options={{ required: true }} />
          <TextAreaInput
            label="Description"
            name="description"
            options={{ required: true }}
          />

          <input
            type="hidden"
            {...methods.register("postId", { value: postId, required: true })}
          />
          <input
            type="hidden"
            {...methods.register("courseId", {
              value: courseId,
              required: true,
            })}
          />

          <SubmitInput value="Create lesson" isLoading={mutation.isLoading} />
        </form>
      </FormProvider>
    </>
  );
};

export default AdminNewLesson;

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

  const post = await prisma.post.create({
    data: {
      owner: {
        connect: { id: session.user.id },
      },
    },
  });

  return {
    props: {
      session,
      postId: post.id,
    },
  };
};
