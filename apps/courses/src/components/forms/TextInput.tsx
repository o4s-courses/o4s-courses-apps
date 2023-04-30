import { useFormContext, type RegisterOptions } from "react-hook-form";

import Field from "./Field";
import Label from "./Label";

type Props = {
  name: string;
  label: string;
  options: RegisterOptions;
};

const TextInput = ({ name, label, options }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Field>
      <Label htmlFor={name}>{label}</Label>
      <input
        type="text"
        className="mb-2 rounded border border-gray-200 p-2 text-slate-700"
        {...register(name, options)}
      />
      {errors[name] && (
        <span className="text-sm text-red-600">{name} is required</span>
      )}
    </Field>
  );
};

export default TextInput;
