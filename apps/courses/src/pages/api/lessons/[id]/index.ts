import { prisma } from "@o4s/db";
import type { NextApiRequest, NextApiResponse } from "next/types";
import type { Lesson } from "@o4s/db";
import { getServerSession } from "@o4s/auth";

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse<Lesson>) {
  const { method } = req;
  const { id: lessonId } = req.query;
  if (typeof lessonId !== "string") { throw new Error('missing id') };

  const session = await getServerSession({ req, res });
  if (!session) res.status(401).end();

  console.log("Session", JSON.stringify(session, null, 2));
  const id = session?.user?.id;
  if (!id) throw Error("Cannot create course: missing id on user record");

  const checkLesson = await prisma.lesson.findFirst({
    where: { id: parseInt(lessonId) },
    include: { course: true }
  });

  if (checkLesson?.course?.authorId !== id) {
    res.status(401).end();
    return;
  };

  switch (method) {
    case 'PUT':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
      const { name, description } = JSON.parse(req.body);

      try {
        const lesson = await prisma.lesson.update({
          where: { id: parseInt(lessonId) },
          data: {
            name,
            description,
          }
        })
        res.status(200).json(lesson);

      } catch (e) {
        console.error('Request error', e);
        res.status(500).end();
      }
      break;
    case 'DELETE':
      try {
        await prisma.lesson.delete({ where: { id: parseInt(lessonId) } });
        res.status(201).end();
      } catch (e) {
        console.error('Request error', e);
        res.status(500).end();
      }
      break;
    default:
      res.setHeader('Allow', ['PUT, DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  };
};