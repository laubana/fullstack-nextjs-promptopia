import { connect } from "@configs/db";
import Prompt from "@models/Prompt";

export const GET = async (req, { params }) => {
  try {
    const { promptId } = params;

    await connect();

    const existingPrompt = await Prompt.findById(promptId)
      .populate({
        path: "user",
      })
      .lean();

    if (existingPrompt) {
      return new Response(
        JSON.stringify({ message: "", data: existingPrompt }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(JSON.stringify({ message: "No prompt found." }), {
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
