import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const URL = process.env.MONGOURL;

const connectDB = async () => {
  try {
    await mongoose.connect(URL, { family: 4 });
    console.log(`MONGODB connected @${URL}`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

export default connectDB;
