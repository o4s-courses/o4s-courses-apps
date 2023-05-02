import Link from "next/link"
import { Includes, Title, SubTitle } from "./"

export const LessonCardList = ({ idx, item: { thumbnail, price, title, description, include, slug } }) => {

    return (
        <div className="gap-x-6 sm:flex">
            <Link
                href={`/cursos/sustentabilidade/${slug}`}
                className="sm:max-w-[17rem]"
            >
                <img
                    src={thumbnail}
                    className="rounded-lg w-full"
                    alt={title}
                    loading="lazy"
                />
            </Link>
            <div className="space-y-2 pt-4 sm:pt-0">
                <div className="text-sm flex items-center justify-between">
                    <SubTitle>Preço: {price}</SubTitle>
                    <Includes className="sm:hidden">
                        {include}
                    </Includes>
                </div>
                <Title>
                    <Link
                        href={`/cursos/sustentabilidade/${slug}`}
                    >
                        {title}
                    </Link>
                </Title>
                <p className="max-w-xl text-gray-600 dark:text-gray-300 sm:line-clamp-2">
                    {description}
                </p>
                <Includes className="hidden sm:block">
                    {include}
                </Includes>
            </div>
        </div>
    )
}