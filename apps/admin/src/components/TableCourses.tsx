import { api, type RouterOutputs } from "~/utils/api";

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