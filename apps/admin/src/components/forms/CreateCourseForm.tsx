import { useState } from "react";
import { api, type RouterOutputs } from "~/utils/api";

const CreateCourseForm: React.FC = () => {
  const utils = api.useContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutate, error } = api.course.create.useMutation({
    async onSuccess() {
      setName("");
      setDescription("");
      await utils.course.all.invalidate();
    },
  });

  return (
    <div className="flex w-full max-w-2xl flex-col p-4">
      <input
        className="mb-2 rounded bg-white/10 p-2 text-white"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
      />
      {error?.data?.zodError?.fieldErrors.name && (
        <span className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.name}
        </span>
      )}
      <input
        className="mb-2 rounded bg-white/10 p-2 text-white"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
      />
      {error?.data?.zodError?.fieldErrors.description && (
        <span className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.description}
        </span>
      )}
      <button
        className="rounded bg-pink-400 p-2 font-bold"
        onClick={() => {
          mutate({
            name,
            description,
          });
        }}
      >
        Criar
      </button>
    </div>
  );
};