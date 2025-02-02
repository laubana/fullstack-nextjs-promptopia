import { connect } from "@configs/db";
import Prompt from "@models/_Prompt";

export const GET = async (req, { params }) => {
  try {
    await connect();

    const existingPrompts = await Prompt.find()
      .populate({
        path: "user",
      })
      .lean();

    return new Response(
      JSON.stringify({ message: "", data: existingPrompts }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ message: "Server Error" }), {
      status: 500,
    });
  }
};
