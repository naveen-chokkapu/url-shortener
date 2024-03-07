import mongoose from "mongoose";

const URLschema = mongoose.Schema({
  URLCODE: String,
  LONGURL: String,
  SHORTURL: String,
  date: { type: String, default: Date.now },
});

export default new mongoose.model("URL", URLschema);
