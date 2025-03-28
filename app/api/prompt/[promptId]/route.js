import dbConfig from "@configs/dbConfig";
import Prompt from "@models/Prompt";

export const GET = async (req, { params }) => {
  try {
    const { promptId } = params;

    await dbConfig.connect();

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
