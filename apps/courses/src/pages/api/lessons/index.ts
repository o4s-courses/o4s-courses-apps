import { prisma } from "@o4s/db";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Lesson } from "@o4s/db";
import { getServerSession } from "@o4s/auth";
import slugify from '@sindresorhus/slugify'
import { addSingleGhostPost } from "@o4s/ghost";

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse<Lesson>) {
  const { method } = req;
  const session = await getServerSession({ req, res });
  if (!session) res.status(401).end();

  console.log("Session", JSON.stringify(session, null, 2))

  switch (method) {
    case 'POST':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
      const { name, description, courseId, postId } = JSON.parse(req.body)

      try {
        const id = session?.user?.id;
        if (!id) throw Error("Cannot create course: missing id on user record");

        const [course] = await prisma.course.findMany({
          where: {
            id: parseInt(courseId),
            author: {
              id: {
                equals: id
              }
            }
          },
        });

        if (!course) {
          res.status(401).end();
        };

        const [post] = await prisma.post.findMany({
          where: {
            id: postId,
            owner: {
              id: {
                equals: id
              }
            }
          }
        });

        if (!post) {
          res.status(401).end();
        };

        const lesson = await prisma.lesson.create({
          data: {
            name,
            description,
            slug: slugify(name),
            course: {
              connect: {
                id: course.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          }
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const ghostPost = await addSingleGhostPost(name)

        const updatePost = await prisma.post.update({
          where: { id: postId },
          data: { postId: ghostPost.posts[0].id },
        });

        res.status(200).json(lesson);
      } catch (e) {
        console.error('Request error', e)
        res.status(500).end();
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}