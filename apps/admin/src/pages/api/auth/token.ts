import { type NextApiRequest, type NextApiResponse } from "next/types";
import { getToken, type JWT } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // if using `NEXTAUTH_SECRET` env variable, we detect it, and you won't actually need to `secret`
  // const token = await getToken({ req })
  let token: JWT = await getToken({ req, secret });
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  token = JSON.stringify(token);
  console.log("JSON Web Token", token);
  res.status(200).json({ jwt: token });
  res.end();
}
