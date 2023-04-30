import type { Lesson, UserLessonProgress } from "@o4s/db";

type Props = {
  activeLesson: Lesson | undefined;
  lessonProgress: number[];
  setLessonProgress: (lessonProgess: number[]) => void;
};

const BottomNav = ({
  activeLesson,
  lessonProgress = [],
  setLessonProgress,
}: Props) => {
  const markLessonCompleted = async () => {
    try {
      const result: UserLessonProgress = await fetch(
        `/api/lessons/${activeLesson.id}/complete`,
        {
          method: "POST",
        },
      ).then((res) => res.json());
      setLessonProgress([...lessonProgress, result.lessonId]);
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  return (
    <>
      <div className="btm-nav">
        {!lessonProgress.includes(activeLesson.id) && (
          <>
            <button className="active" onClick={() => markLessonCompleted()}>
              <svg
                className="h-6 w-6 fill-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="btm-nav-label">Mark Lesson Completed</span>
            </button>
          </>
        )}
        <button disabled>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button className="active">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default BottomNav;
