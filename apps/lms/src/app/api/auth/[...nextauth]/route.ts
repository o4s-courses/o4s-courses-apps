import NextAuth from "next-auth";

import { authOptions } from "@o4s/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
