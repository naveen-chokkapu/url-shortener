import express from "express";
import URLmodel from "../models/URLmodel.js";

const Router = express.Router();
Router.use(express.json());

Router.get("/:code", async (req, res) => {
  try {
    const URL = await URLmodel.findOne({ URLCODE: req.params.code });
    console.log(req.params.code);

    if (URL) return res.redirect(URL.LONGURL);
    else {
      return res.status(401).json("No URL Found");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

export default Router;
