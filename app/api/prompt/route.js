import session from "@middlewares/session";
import { connect } from "@configs/db";
import Prompt from "@models/prompt";

export const POST = async (req, { params }) => {
  return session(req, async (req) => {
    try {
      const { prompt, category, userId } = await req.json();
      const id = req.id;

      if (!id) {
        return new Response(JSON.stringify({ message: "" }), { status: 401 });
      }

      await connect();

      const newPrompt = await Prompt.create({
        user: userId,
        prompt,
        category,
      });

      return new Response(JSON.stringify({ message: "", data: newPrompt }), {
        status: 201,
      });
    } catch (error) {
      console.error(error);

      return new Response(JSON.stringify({ message: "" }), { status: 500 });
    }
  });
};

export const DELETE = async (req, { params }) => {
  return session(req, async (req) => {
    try {
      const { promptId } = await req.json();
      const id = req.id;

      await connect();

      const oldPrompt = await Prompt.findById(promptId).populate({
        path: "user",
      });

      if (id !== oldPrompt.user.id) {
        return new Response(JSON.stringify({ message: "" }), { status: 403 });
      }

      await Prompt.findByIdAndDelete(promptId);

      return new Response(JSON.stringify({ message: "" }), {
        status: 200,
      });
    } catch (error) {
      console.error(error);

      return new Response(JSON.stringify({ message: "" }), { status: 500 });
    }
  });
};

export const PUT = async (req, { params }) => {
  return session(req, async (req) => {
    try {
      const { promptId, prompt, category } = await req.json();
      const id = req.id;

      await connect();

      const oldPrompt = await Prompt.findById(promptId).populate({
        path: "user",
      });

      if (id !== oldPrompt.user.id) {
        return new Response(JSON.stringify({ message: "" }), { status: 403 });
      }

      const updatedPrompt = await Prompt.findByIdAndUpdate(
        promptId,
        { prompt, category },
        { new: true }
      );

      if (updatedPrompt) {
        return new Response(
          JSON.stringify({ message: "", data: updatedPrompt }),
          {
            status: 200,
          }
        );
      } else {
        return new Response(JSON.stringify({ message: "" }), { status: 404 });
      }
    } catch (error) {
      console.error(error);

      return new Response(JSON.stringify({ message: "" }), { status: 500 });
    }
  });
};
