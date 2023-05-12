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

const ManageUsers = () => {
	const router = useRouter();
	const toast = useRef<Toast>(null);

	//if (typeof courseId !== "string") {
	//  throw new Error("missing id");
	//}

	const userQuery = api.user.all.useQuery({ skip: 0, take: 50 });

	const deleteCourseMutation = api.course.delete.useMutation({
		onSettled: () => {
			void courseQuery.refetch();
			void router.push('/');
			toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Course deleted successfully', life: 3000 });
		},
		onError: (error) => {
			console.error(error);
			toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Something went wrong', life: 3000 });
		},
	});

	return (
		<><Toast ref={toast} />
			{userQuery.data ? (
				<><Header title={courseQuery.data.name} />
					<Nav />
					<CourseHeader
						id={courseQuery.data.id}
						name={courseQuery.data.name}
						published={courseQuery.data.published}
						onCourseDelete={() => deleteCourseMutation.mutate(courseQuery.data.id)} />
					<SectionWrapper className="mt-0">
						<UsersList users={userQuery.data} />
					</SectionWrapper>
				</>
			) : (
				<Loading />
			)}
		</>
	);

};

export default ManageUsers;