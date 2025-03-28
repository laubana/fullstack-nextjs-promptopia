import dbConfig from "@configs/dbConfig";
import Prompt from "@models/Prompt";

export const GET = async (req, { params }) => {
  try {
    await dbConfig.connect();

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
