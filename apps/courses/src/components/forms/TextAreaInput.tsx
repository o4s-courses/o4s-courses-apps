import { useFormContext, type RegisterOptions } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import Field from "./Field";
import Label from "./Label";

type Props = {
  name: string;
  label: string;
  options: RegisterOptions;
};

const TextAreaInput = ({ name, label, options }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    register,
    formState: { errors },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  } = useFormContext();

  return (
    <Field>
      <Label htmlFor={name}>{label}</Label>
      <TextareaAutosize
        className="mb-2 rounded border border-gray-200 p-2 text-slate-700"
        {...register(name, options)}
      />
      {errors[name] && (
        <span className="text-sm text-red-600">{name} is required</span>
      )}
    </Field>
  );
};

export default TextAreaInput;
