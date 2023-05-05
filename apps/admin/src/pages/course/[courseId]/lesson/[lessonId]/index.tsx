import { useRouter } from "next/router";
import { type NextPage } from "next/types";
import { api, type RouterOutputs } from "~/utils/api";

import Header from "~/components/ui/Header";
import Nav from "~/components/ui/Nav";
import SectionWrapper from "~/components/SectionWrapper";
import LessonHeader from "~/components/ui/LessonHeader";
import Loading from "~/components/ui/Loading";
import LessonEditor from "~/components/ui/LessonEditor";

const EditLesson: NextPage = () => {
	const router = useRouter();
  const query = router.query;

  const lessonId: string = query.lessonId;

	//if (typeof courseId !== "string") {
  //  throw new Error("missing id");
  //}

	const id = parseInt(lessonId);

	const lessonQuery = api.lesson.getContent.useQuery({ id });

	return (
		<>
		{lessonQuery.data ? (
			<><Header title={lessonQuery.data.name} />
			<Nav />
			<LessonHeader id={lessonQuery.data.id} name={lessonQuery.data.name} status={lessonQuery.data.status} />
			<SectionWrapper className="mt-0">
				<LessonEditor
				  id={id}
					html={lessonQuery.data.html}
				/>
			
			</SectionWrapper>
			</>
		) : (
      <Loading />
    )}
		</>
	);
};

export default EditLesson;