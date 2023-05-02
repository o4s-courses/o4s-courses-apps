import Link from "next/link"
import { Duration, Title, SubTitle } from "./"

export const LessonCardGrid = ({ idx, item: { thumbnail, title, description, duration, slug } }) => {

    return (
        <div className="space-y-2 sm:max-w-sm">
            <Link href={`/cursos/sustentabilidade/${slug}`}>
                <img src={thumbnail} className="rounded-lg w-full" alt={title} />
            </Link>
            <div className="pt-2 text-sm flex items-center justify-between">
                <SubTitle>Curso {idx + 1}</SubTitle>
                <Duration>{duration}</Duration>
            </div>
            <Title>
                <Link href={`/cursos/sustentabilidade/${slug}`}>
                    {title}
                </Link>
            </Title>
            <p>
                {description}
            </p>
        </div>
    )
}