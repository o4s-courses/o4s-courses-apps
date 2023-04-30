import { type Course, type Subscription } from "@o4s/db";

import CourseCard from "~/components/CourseCard";

type Props = {
  courses: (Course & {
    students: Subscription[];
  })[];
  isAdmin?: boolean;
};

const CourseGrid = ({ courses, isAdmin = false }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} isAdmin={isAdmin} />
        ))}
      </div>
    </>
  );
};

export default CourseGrid;
