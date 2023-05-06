/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api, type RouterOutputs } from "~/utils/api";
import { ConfirmDialog } from "primereact/confirmdialog"; // For <ConfirmDialog /> component
import { confirmDialog } from "primereact/confirmdialog"; // For confirmDialog method

import Loading from "~/components/ui/Loading";
import Link from "next/link";

const CourseCard: React.FC<{
  course: RouterOutputs["course"]["byAuthor"][number];
  onCourseDelete?: () => void;
}> = ({ course, onCourseDelete }) => {

	const confirm = (event) => {
    confirmDialog({
        trigger: event.currentTarget,
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => onCourseDelete,
        // reject: () => rejectFunc()
    });
	};

  return (
    <><div className="flex flex-row rounded-lg bg-white/10 p-4 transition-all hover:scale-[101%]">
			<div className="flex-grow">
				<h2 className="text-2xl font-bold text-pink-400">{course.name}</h2>
				<p className="mt-2 text-sm">{course.description}</p>
				<p className="mt-2 text-sm font-bold">
					Modules: {course._count.modules} | Lessons: {course._count.lessons} | Students: {course._count.students}
				</p>
			</div>
			<div className="px-5">
				<span
					className="cursor-pointer text-sm font-bold uppercase text-green-400"
				>
					<Link href={`/courses/${course.id}`} alt={"Manage your course"}>
						Manage
					</Link>
				</span>
			</div>
			<div>
				<span
					className="cursor-pointer text-sm font-bold uppercase text-red-400"
					onClick={() => confirm('bottom-right')} style={{ minWidth: '10rem' }}
				>
					Delete
				</span>
			</div>
		</div>
		<ConfirmDialog />
		</>
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
      <Loading />
    )}
		</>
	)
};

export default TableCourses;