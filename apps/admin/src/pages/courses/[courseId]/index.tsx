import { useRef } from "react";
import { useRouter } from "next/router";
import { api, type RouterOutputs } from "~/utils/api";

import Header from "~/components/ui/Header";
import Nav from "~/components/ui/Nav";
import SectionWrapper from "~/components/SectionWrapper";
import CourseHeader from "~/components/ui/CourseHeader";
import Loading from "~/components/ui/Loading";
import ModulesList from "~/components/ui/ModuleList";
import { Toast } from "primereact/toast";

const ManageCourse = () => {
	const router = useRouter();
	const toast = useRef<Toast>(null);

  const query = router.query;
  const courseId: string = query.courseId;

	//if (typeof courseId !== "string") {
  //  throw new Error("missing id");
  //}

	const courseQuery = api.course.byId.useQuery({ id: parseInt(courseId) });

	const deleteCourseMutation = api.course.delete.useMutation({
    onSettled: () => {
			void courseQuery.refetch();
			void router.push('/');
			toast.current?.show({severity:'success', summary: 'Success', detail:'Course deleted successfully', life: 6000});
		},
		onError: (error) => {
			console.error(error);
			toast.current?.show({severity:'error', summary: 'Error', detail:'Something went wrong', life: 6000});
		},
  });

	return (
		<><Toast ref={toast} />
		{courseQuery.data ? (
			<><Header title={courseQuery.data.name} />
			<Nav />
			<CourseHeader
				id={courseQuery.data.id}
				name={courseQuery.data.name}
				published={courseQuery.data.published}
				onCourseDelete={() => deleteCourseMutation.mutate(courseQuery.data.id)} />
			<SectionWrapper className="mt-0">
				<ModulesList modules={courseQuery.data.modules} />
			</SectionWrapper>
			</>
		) : (
      <Loading />
    )}
		</>
	);

};

export default ManageCourse;