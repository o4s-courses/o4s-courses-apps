import { useState } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import toast from "react-hot-toast";

const CreateCourseForm: React.FC = () => {
  const utils = api.useContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutate, error } = api.course.create.useMutation({
    async onSuccess() {
      setName("");
      setDescription("");
			toast.success("Curso criado com sucesso.");
      await utils.course.byAuthor.invalidate();
    },
		onError(error, variables, context) {
			// An error happened!
			toast.error(`ERROR ${error}`);
		},
  });

  return (
    <div className="flex w-full max-w-2xl flex-col p-4">
      <input
        className="mb-2 rounded bg-white/10 p-2 text-white"
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
        className="mb-2 rounded bg-white/10 p-2 text-white"
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
        className="rounded bg-pink-400 p-2 font-bold"
        onClick={() => {
          mutate({
            name,
            description,
          });
        }}
      >
        Adicionar novo curso
      </button>
    </div>
  );
};

const CourseCard: React.FC<{
  course: RouterOutputs["course"]["byAuthor"][number];
  onCourseDelete?: () => void;
}> = ({ course, onCourseDelete }) => {
  return (
    <div className="flex flex-row rounded-lg bg-white/10 p-4 transition-all hover:scale-[101%]">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-pink-400">{course.name}</h2>
        <p className="mt-2 text-sm">{course.description}</p>
				<p className="mt-2 text-sm">Lessons: {course._count.lessons} | Students: {course._count.students}</p>
      </div>
      <div>
        <span
          className="cursor-pointer text-sm font-bold uppercase text-pink-400"
          onClick={onCourseDelete}
        >
          Delete
        </span>
      </div>
    </div>
  );
};

const TableCourses = () => {
	const courseQuery = api.course.byAuthor.useQuery();

	const deleteCourseMutation = api.course.delete.useMutation({
    onSettled: () => courseQuery.refetch(),
  });

	return (
		<>
		<CreateCourseForm />
		{courseQuery.data ? (
      <div className="w-full">
        {courseQuery.data?.length === 0 ? (
          <span>There are no courses!</span>
        ) : (
          <div className="flex justify-center overflow-y-scroll px-4 text-2xl">
            <div className="flex w-full flex-col gap-4">
              {courseQuery.data?.map((p) => {
                return (
                  <CourseCard
                    key={p.id}
                    course={p}
                    onCourseDelete={() => deleteCourseMutation.mutate(p.id)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    ) : (
      <p>Loading...</p>
    )}
		</>
	)
};

export default TableCourses;