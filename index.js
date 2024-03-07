import express from "express";
import DB from "./config/db.js";
import dotenv from "dotenv";
import shortRoute from "./routes/shortRoute.js";
import getURLRoute from "./routes/getURLRoute.js";

dotenv.config();
DB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use("/", getURLRoute);
app.use("/api/", shortRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
