import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

import { type Lesson } from "@o4s/db";

import SubmitInput from "./SubmitInput";
import TextAreaInput from "./TextAreaInput";
import TextInput from "./TextInput";

export type Inputs = {
  name: string;
  description: string;
};

type Props = {
  lesson?: Lesson;
  onSubmit: SubmitHandler<Inputs>;
  isLoading: boolean;
};

const LessonForm = ({ lesson, onSubmit, isLoading }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const methods = useForm<Inputs>({
    defaultValues: { name: lesson?.name, description: lesson?.description },
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
        <SubmitInput
          value={`${lesson ? "Update" : "Create"} lesson`}
          isLoading={isLoading}
        />
      </form>
    </FormProvider>
  );
};

export default LessonForm;
