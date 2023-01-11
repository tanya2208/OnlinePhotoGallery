import express from "express";
import { Image } from "../models/image.model.js";
import "express-async-errors";

export const router = new express.Router();

router.post("/images", async (req, res, next) => {
  const { link, user } = req.body;
  const image = await Image.create({
    link,
    time : Date.now(),
    user,
  });
  return res.json({ status: 200, image });
});

router.get("/images/:id", async (req, res) => {
  const image = await Image.findById(req.params.id);
  return res.json({ status: 200, image });
});


