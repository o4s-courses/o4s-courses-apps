import { useState } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import toast from "react-hot-toast";

import Loading from "~/components/ui/Loading";

const CreateCourseForm: React.FC = () => {
  const utils = api.useContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutate, error } = api.course.create.useMutation({
    async onSuccess() {
      setName("");
      setDescription("");
			toast.success("Course created successfully");
      await utils.course.byAuthor.invalidate();
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

const CourseCard: React.FC<{
  course: RouterOutputs["course"]["byAuthor"][number];
  onCourseDelete?: () => void;
}> = ({ course, onCourseDelete }) => {
  return (
    <div className="flex flex-row rounded-lg bg-white/10 p-4 transition-all hover:scale-[101%]">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-pink-400">{course.name}</h2>
        <p className="mt-2 text-sm">{course.description}</p>
				<p className="mt-2 text-sm font-bold">
					Modules: {course._count.modules} | Lessons: {course._count.lessons} | Students: {course._count.students}
				</p>
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
      <Loading />
    )}
		</>
	)
};

export default TableCourses;