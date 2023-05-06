import { useState } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import Header from "~/components/ui/Header";
import Nav from "~/components/ui/Nav";
import SectionWrapper from "~/components/SectionWrapper";

const CreateCourseForm: React.FC = () => {
	const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutate, error } = api.course.create.useMutation({
    onSuccess() {
      setName("");
      setDescription("");
			toast.success("Course created successfully");
			void router.push("/");
    },
		onError(error) {
			console.error(error);
      toast.error("Something went wrong");
		},
  });

  return (
    <div className="flex w-full max-w-2xl flex-col p-4">
      <input
        className="mb-2 rounded dark:bg-white/10 p-2 dark:text-white bg-black/10 text-black"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      {error?.data?.zodError?.fieldErrors.name && (
        <span className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.name}
        </span>
      )}
      <input
        className="mb-2 rounded dark:bg-white/10 p-2 dark:text-white bg-black/10 text-black"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      {error?.data?.zodError?.fieldErrors.description && (
        <span className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.description}
        </span>
      )}
      <button
        className="block w-full text-white bg-blue-600 dark:bg-sky-500 hover:bg-blue-500 dark:hover:bg-sky-600 ring-offset-2 ring-blue-600 dark:ring-sky-500 focus:ring shadow px-4 py-2.5 font-bold text-sm text-center duration-150 rounded-lg"
        onClick={() => {
          mutate({
            name,
            description,
          });
        }}
      >
        Add new course
      </button>
    </div>
  );
};

const NewCourse = () => {

	return (
		<><Header title="Create course - Admin" />
		<Nav />
		<SectionWrapper className="mt-0">
			<CreateCourseForm />
		</SectionWrapper>
		</>
	);
};

export default NewCourse;