import express, { urlencoded } from "express";
import dotenv from "dotenv";
import validURL from "valid-url";
import shortID from "shortid";
import URLmodel from "../models/URLmodel.js";

dotenv.config();

const Router = express.Router();
Router.use(express.json());
Router.use(express.urlencoded({ extended: true }));

const baseURL = process.env.BASEURL;

Router.post("/shorten", async (req, res) => {
  const { URL } = req.body;

  if (!validURL.isUri(baseURL)) {
    return res.status(401).json("Invalid baseURL");
  }

  const URLCODE = shortID.generate();
  if (validURL.isUri(URL)) {
    try {
      let data = await URLmodel.findOne({ URL: URL });
      if (data) res.json(data);
      else {
        const SHORTURL = baseURL + "/" + URLCODE;

        data = new URLmodel({
          URLCODE,
          LONGURL: URL,
          SHORTURL,
          date: new Date(),
        });

        await data.save();
        res.json(data);
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid URL");
  }
});

export default Router;
