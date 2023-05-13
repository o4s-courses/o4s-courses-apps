import { type NextApiRequest, type NextApiResponse } from "next/types";
import { getToken, type JWT } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // if using `NEXTAUTH_SECRET` env variable, we detect it, and you won't actually need to `secret`
  // const token = await getToken({ req })
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("JSON Web Token", token);
  res.status(200).json(JSON.stringify(token));
  res.end();
}
