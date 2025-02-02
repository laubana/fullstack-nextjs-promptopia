import { connect } from "@configs/db";
import User from "@models/_User";

export const GET = async (req, { params }) => {
  try {
    const { userId } = params;

    await connect();

    const existingUser = await User.findById(userId).lean();

    if (existingUser) {
      return new Response(JSON.stringify({ message: "", data: existingUser }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ message: "Server Error" }), {
      status: 500,
    });
  }
};
