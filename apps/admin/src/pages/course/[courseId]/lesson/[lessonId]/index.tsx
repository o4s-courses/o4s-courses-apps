import { useRouter } from "next/router";
import { type NextPage } from "next/types";
import dynamic from "next/dynamic";
import { api, type RouterOutputs } from "~/utils/api";

import Header from "~/components/ui/Header";
import Nav from "~/components/ui/Nav";
import SectionWrapper from "~/components/SectionWrapper";
import LessonHeader from "~/components/ui/LessonHeader";
import Loading from "~/components/ui/Loading";
import toast from "react-hot-toast";

const EditLesson: NextPage = () => {
	const utils = api.useContext();
	const router = useRouter();
  const query = router.query;
	const Editor = dynamic(() => import('~/components/ui/Editor'), { ssr: false });

  const lessonId: string = query.lessonId;

	//if (typeof courseId !== "string") {
  //  throw new Error("missing id");
  //}

	const id = parseInt(lessonId);

	const lessonQuery = api.lesson.getContent.useQuery({ id });

	const { mutate, error } = api.lesson.saveHTML.useMutation({
    async onSuccess() {
			await utils.lesson.getContent.invalidate();
			toast.success("Lesson updated successfully");
    },
		onError(error) {
			console.error(error);
      toast.error("Something went wrong");
		},
  });

	return (
		<>
		{lessonQuery.data ? (
			<><Header title={lessonQuery.data.name} />
			<Nav />
			<LessonHeader id={lessonQuery.data.id} name={lessonQuery.data.name} status={lessonQuery.data.status} />
			<SectionWrapper className="mt-0">
				<Editor
					html={lessonQuery.data.html}
					onChange={(html: string) => {
						mutate({
							id,
							html,
						});
					}}
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