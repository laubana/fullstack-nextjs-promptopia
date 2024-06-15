import mongoose from "mongoose";

const connect = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(error);
  }
};

export { connect };
