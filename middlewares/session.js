import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/authOption";

export default async (req, next) => {
  const session = await getServerSession(authOptions);

  req.id = session?.user?.id;

  return next(req);
};
