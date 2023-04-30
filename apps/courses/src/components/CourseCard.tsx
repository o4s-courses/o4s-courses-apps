import { type Course, type Subscription } from "@o4s/db";

type Props = {
  course: Course & {
    students: Subscription[];
  };
  isAdmin: boolean;
};

const CourseCard = ({ course, isAdmin }: Props) => {
  const href = isAdmin
    ? `/admin/courses/${course.id}`
    : `/courses/${course.id}`;
  //const isStudent = course.students[0].userId === session.user.id ? true : false
  let isStudent = false;
  if (course.students.length > 0) {
    isStudent = true;
  }

  return (
    <>
      <div className="card card-bordered bg-base-100 w-96 rounded-lg border shadow-xl transition hover:shadow-md">
        <figure>
          <img
            src={`/images/courses/${course.id}.jpg`}
            alt={`Course thumbnail preview for ${course.name}`}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{course.name}</h2>
          <p>{course.description}</p>
          <div className="card-actions justify-end">
            {isAdmin ? (
              <a href={href} role="button" className="btn btn-primary">
                ADMIN
              </a>
            ) : (
              <button className="btn btn-primary">
                {isStudent ? "Take" : "Buy now"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
