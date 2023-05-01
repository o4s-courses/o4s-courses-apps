import Head from "next/head";
import Image from "next/image";

import { PlayList } from "../../../components/ui/PlayList";
import content from "../../../lessonExamples/lesson";
import lessons from "../../../lessonExamples/lessons.json";

const Lesson = ({ getLesson }) => {
  const Heading = ({ children, className, ...props }) => (
    <h1
      {...props}
      className={`${
        className || ""
      } text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl`}
    >
      {children}
    </h1>
  );

  return (
    <>
      <Head>
        <title>{getLesson?.title}</title>
        <meta name="description" content="" />
      </Head>

      <div className="mt-16 lg:mt-20">
        <div className="mx-auto lg:max-w-screen-xl lg:px-8">
          <Image
            src={getLesson?.thumbnail}
            className="w-full rounded-lg"
            alt="IO Academy"
            width={1640}
            height={924}
          />
        </div>
        <div className="mx-auto mt-12 justify-between gap-8 lg:flex lg:max-w-screen-xl lg:px-8">
          <div className="h-full lg:border-r lg:pr-8 lg:dark:border-gray-800">
            <Heading className="px-4 md:px-8 lg:px-0">
              {getLesson?.title}
            </Heading>
            <PlayList
              items={lessons}
              className="sticky -top-1 mt-6 flex-none bg-white px-4 dark:bg-gray-900 md:px-8 lg:hidden lg:px-0"
            />
            <article
              className="prose dark:prose-invert mt-6 max-w-3xl px-4 md:px-8 lg:px-0"
              dangerouslySetInnerHTML={{ __html: content }}
            ></article>
          </div>
          <div className="hidden flex-none lg:block">
            <PlayList items={lessons} className="sticky top-3 w-full" />
          </div>
        </div>
      </div>

      <style></style>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { slug } = query;
  // Get the lesson based on the slug and pass the data to props
  const getLesson = lessons.find((item) => item.slug == slug);
  return {
    props: {
      getLesson,
    }, // will be passed to the page component as props
  };
}

export default Lesson;
