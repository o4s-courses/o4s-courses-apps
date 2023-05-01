import { prisma } from "@o4s/db";
import type { NextApiRequest, NextApiResponse } from "next/types";
import type { Post } from "@o4s/db";

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse<Post>) {
  const { method } = req;

  switch (method) {
    case 'POST':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const id = req.body.post.current.id;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const status = req.body.post.current.status;

      try {
        if (!id) throw Error("Cannot create course: missing post id record");

        // update post record
        const post = await prisma.post.update({
          where: {
            postId: id
          },
          data: {
            status: status,
          }
        });

        if (!post) {
          res.status(401).end();
        };

        res.status(200).json(post);
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