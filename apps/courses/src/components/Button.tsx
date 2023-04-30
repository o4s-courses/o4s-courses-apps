import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  rest?: any;
  intent?: "primary" | "secondary" | "danger" | "error";
};

const Button = ({ children, intent = "primary", ...rest }: Props) => {
  return (
    <button
      className={clsx({
        "my-4 inline-block w-fit rounded px-4 py-3 text-white": true,
        "btn btn-primary": intent === "primary",
        "btn btn-secondary": intent === "secondary",
        "btn btn-warning": intent === "danger",
        "btn btn-error": intent === "error",
      })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
