import { useFormContext, type RegisterOptions } from "react-hook-form";

import Field from "./Field";
import Label from "./Label";

type Props = {
  name: string;
  label: string;
  options?: RegisterOptions;
};

const Checkbox = ({ name, label, options = {} }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Field>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="mb-1 block cursor-not-allowed border-gray-200"
          disabled
          {...register(name, options)}
        />
        <Label htmlFor={name}>{label}</Label>
      </div>
    </Field>
  );
};

export default Checkbox;
