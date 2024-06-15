import { connect } from "@configs/db";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connect();

    const prompts = await Prompt.find().populate({
      path: "user",
    });

    return new Response(JSON.stringify({ message: "", data: prompts }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ message: "" }), { status: 500 });
  }
};
