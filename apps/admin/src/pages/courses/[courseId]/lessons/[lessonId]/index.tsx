import { useRouter } from "next/router";
import { api } from "~/utils/api";

import Header from "~/components/ui/Header";
import Nav from "~/components/ui/Nav";
import Loading from "~/components/ui/Loading";
import LessonEditor from "~/components/ui/LessonEditor";

const EditLesson = () => {
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
			<LessonEditor
				lesson={lessonQuery.data}
			/>
			</>
		) : (
      <Loading />
    )}
		</>
	);
};

export default EditLesson;