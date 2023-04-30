import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import clsx from "clsx";

import type { Course, Lesson, Post, Subscription } from "@o4s/db";

import BottomNav from "~/components/BottomNav";
import EmptyState from "~/components/EmptyState";
import Heading from "~/components/Heading";
import LessonBody from "~/components/LessonBody";

type Props = {
  course: Course & {
    lessons: (Lesson & {
      post: Post | null;
    })[];
    students: Subscription[];
  };
  lessonProgress: number[];
  setLessonProgress: (lessonProgess: number[]) => void;
  role: string | undefined;
};

const CourseViewer = ({
  course,
  lessonProgress = [],
  setLessonProgress,
  role,
}: Props) => {
  const router = useRouter();
  const slug = (router.query.slug as string[]) || [];
  const lessonIndex = slug[2] ? parseInt(slug[2]) - 1 : 0;

  const [activeLesson, setActiveLesson] = useState(course.lessons[lessonIndex]);
  const postId = activeLesson?.post?.postId;
  const postReady = activeLesson?.post?.status === "published";
  // const placeholder = activeLesson?.post?.placeholder
  let isStudent = false;

  if (course.students.length > 0) isStudent = true;

  useEffect(() => {
    const lessonIndex =
      course.lessons.findIndex((lesson) => lesson.id === activeLesson?.id) + 1;
    void router.push(
      `/courses/${course.id}/lessons/${lessonIndex}`,
      undefined,
      {
        shallow: true,
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLesson, course]);

  if (!course.lessons.length) {
    return (
      <div className="mx-8 mt-12 max-w-lg lg:mx-auto">
        <EmptyState>This course does not have any lessons</EmptyState>
      </div>
    );
  }

  return (
    <>
      <div className="grid px-5 lg:grid-cols-[100%]">
        <div>
          <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
              <label
                htmlFor="my-drawer-4"
                className="drawer-button btn btn-primary"
              >
                Lessons
              </label>
              {(postId && postReady && isStudent) || role === "admin" ? (
                <div>
                  <LessonBody content={activeLesson?.post?.html} />
                </div>
              ) : (
                <div className="mb-6 w-full bg-gray-200" />
              )}

              <Heading>{activeLesson?.name}</Heading>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {activeLesson?.description}
              </p>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
              <ul className="menu bg-base-100 text-base-content w-80 p-4">
                {course.lessons.map((lesson) => (
                  // eslint-disable-next-line react/jsx-key
                  <li>
                    <a
                      onClick={() => setActiveLesson(lesson)}
                      key={lesson.id}
                      className={clsx({
                        "flex cursor-pointer gap-5 px-6 py-4 hover:bg-gray-50":
                          true,
                        "bg-yellow-50": postId === lesson.post?.postId,
                      })}
                    >
                      {lessonProgress.includes(lesson.id) && (
                        <span className="absolute z-10 -translate-x-2 -translate-y-2">
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
                        </span>
                      )}

                      {lesson.post?.id &&
                        lesson.post.status === "published" && (
                          <Image
                            src={`${lesson.post.coverImage}`}
                            alt={`Lesson thumbnail preview for ${lesson.name}`}
                            width={106}
                            height={60}
                          />
                        )}
                      <div className="overflow-hidden">
                        <p className="text-md my-1 truncate italic text-slate-600 dark:text-slate-400">
                          {lesson.description}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <BottomNav
        activeLesson={activeLesson}
        lessonProgress={lessonProgress}
        setLessonProgress={setLessonProgress}
      />
    </>
  );
};

export default CourseViewer;
