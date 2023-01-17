import express from "express";
import { Image } from "../models/image.model.js";
import "express-async-errors";

export const router = new express.Router();

router.post("/images", async (req, res, next) => {
  const { link, user } = req.body;
  const image = await Image.create({
    link,
    time: Date.now(),
    user,
  });
  return res.json({ status: 200, image });
});

router.get("/posts/:id", async (req, res) => {
  const post = await Image.findById(req.params.id);
  return res.json({ status: 200, post });
});

router.get("/posts", async (req, res) => {
  const incr = req.query.incr;
  const posts = await Image.find().sort({time: -1}).limit(incr);
  return res.json({ status: 200, posts });
});

router.delete("/posts/:id", async (req, res) => {
  await Image.deleteOne({ _id: req.params.id });
  return res.json({ status: 200 });
});

router.post("/posts/:id/comments", async (req, res) => {
  const { comment, commentOwner } = req.body;
  const post = await Image.findById(req.params.id);
  post['comments'].push({
    comment,
    commentOwner,
  });
  await post.save();
  return res.json({ status: 200, post });
});
