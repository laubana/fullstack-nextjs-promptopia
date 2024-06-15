import { connect } from "@configs/db";
import User from "@models/user";

export const GET = async (req, { params }) => {
  try {
    const { userId } = params;

    await connect();

    const user = await User.findById(userId);

    if (user) {
      return new Response(JSON.stringify({ message: "", data: user }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "" }), { status: 404 });
    }
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ message: "" }), { status: 500 });
  }
};
