import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

import { type Course } from "@o4s/db";

import Checkbox from "./Checkbox";
import SubmitInput from "./SubmitInput";
import TextAreaInput from "./TextAreaInput";
import TextInput from "./TextInput";

export type Inputs = {
  name: string;
  description: string;
};

type Props = {
  course?: Course;
  onSubmit: SubmitHandler<Inputs>;
  isLoading: boolean;
};

const CourseForm = ({ course, onSubmit, isLoading }: Props) => {
  const methods = useForm<Inputs>({
    defaultValues: { name: course?.name, description: course?.description },
  });

  return (
    <FormProvider {...methods}>
      <form
        className="flex max-w-lg flex-col"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <TextInput label="Name" name="name" options={{ required: true }} />
        <TextAreaInput
          label="Description"
          name="description"
          options={{ required: true }}
        />
        <Checkbox label="Publish" name="published" />

        <SubmitInput
          value={`${course ? "Update" : "Create"} course`}
          isLoading={isLoading}
        />
      </form>
    </FormProvider>
  );
};

export default CourseForm;
