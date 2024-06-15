import { connect } from "@configs/db";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    const { promptId } = params;

    await connect();

    const prompt = await Prompt.findById(promptId).populate({
      path: "user",
    });

    if (prompt) {
      return new Response(JSON.stringify({ message: "", data: prompt }), {
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
