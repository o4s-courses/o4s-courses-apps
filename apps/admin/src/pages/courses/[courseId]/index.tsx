/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRouter } from "next/router";
import { api, type RouterOutputs } from "~/utils/api";

import Header from "~/components/ui/Header";
import Nav from "~/components/ui/Nav";
import SectionWrapper from "~/components/SectionWrapper";
import CourseHeader from "~/components/ui/CourseHeader";
import Loading from "~/components/ui/Loading";
import ModulesList from "~/components/ui/ModuleList";

const ManageCourse = () => {
	const router = useRouter();
  const query = router.query;

  const courseId: string = query.courseId;

	//if (typeof courseId !== "string") {
  //  throw new Error("missing id");
  //}

	const courseQuery = api.course.byId.useQuery({ id: parseInt(courseId) });

	return (
		<>
		{courseQuery.data ? (
			<><Header title={courseQuery.data.name} />
			<Nav />
			<CourseHeader id={courseQuery.data.id} name={courseQuery.data.name} published={courseQuery.data.published} />
			<SectionWrapper className="mt-0">
				<ModulesList courseId={courseQuery.data.id} />
			
			</SectionWrapper>
			</>
		) : (
      <Loading />
    )}
		</>
	);

};

export default ManageCourse;