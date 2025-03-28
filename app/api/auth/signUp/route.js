import dbConfig from "@configs/dbConfig";
import session from "@middlewares/session";
import User from "@models/User";

export const POST = async (req, { params }) => {
  return session(req, async (req) => {
    try {
      const { email, name } = await req.json();

      if (!email || !name) {
        return new Response(JSON.stringify({ message: "Invalid Input" }), {
          status: 400,
        });
      }

      await dbConfig.connect();

      const newUser = await User.create({
        email,
        name,
        imageUrl: `https://avatar.iran.liara.run/username?username=${name}`,
      });

      return new Response(
        JSON.stringify({
          message: "User created successfully.",
          data: newUser,
        }),
        {
          status: 201,
        }
      );
    } catch (error) {
      console.error(error);

      return new Response(JSON.stringify({ message: "Server Error" }), {
        status: 500,
      });
    }
  });
};
