import { prisma } from "@o4s/db";
import type { NextApiRequest, NextApiResponse } from "next/types";
import type { UserLessonProgress } from "@o4s/db";
import { getServerSession } from "@o4s/auth";

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse<UserLessonProgress | null>) {
  const { method } = req;
  const { id: lessonId } = req.query;
  if (typeof lessonId !== "string") { throw new Error('missing id') };

  switch (method) {
    case 'POST':
      const session = await getServerSession({ req, res });
      if (!session) res.status(401).end();

      try {
        const userId = session?.user?.id;
        if (!userId) throw Error("Cannot create course: missing id on user record");

        const connect = await prisma.userLessonProgress.create({
          data: {
            lessonId: parseInt(lessonId),
            userId
          }
        });

        res.status(200).json(connect);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).end();
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  };
};