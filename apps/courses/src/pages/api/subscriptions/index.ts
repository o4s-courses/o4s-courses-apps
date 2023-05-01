import { prisma } from "@o4s/db";
import type { NextApiRequest, NextApiResponse } from "next/types";
import type { Subscription } from "@o4s/db";
import { getServerSession } from "@o4s/auth";

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse<Subscription>) {
  const { method } = req;
  const session = await getServerSession({ req, res });
  if (!session) res.status(401).end();

  console.log("Session", JSON.stringify(session, null, 2));

  switch (method) {
    case 'POST':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
      const { courseId } = JSON.parse(req.body);

      try {
        const id = session?.user?.id;
        if (!id) throw Error("Cannot create subscription: missing id on user record");

        const [course] = await prisma.course.findMany({
          where: {
            id: parseInt(courseId),
          },
        });

        if (!course) {
          res.status(401).end();
        };

        const subscription = await prisma.subscription.create({
          data: {
            userId: id,
            courseId: parseInt(courseId),
          }
        });

        res.status(200).json(subscription);
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