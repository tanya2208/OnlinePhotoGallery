import express from "express";
import { User } from "../models/user.model.js";
import "express-async-errors";

export const router = new express.Router();

router.post("/users/register", async (req, res) => {
  const { name, surname, email, password, nickname, occupation, city } =
    req.body;
  const user = await User.create({
    name,
    surname,
    email,
    password,
    nickname,
    occupation,
    city,
  });
  const token = await user.generateAuthToken();
  return res.json({ status: 200, token });
});

router.post("/users/login", async (req, res, next) => {
  const user = await User.findByCredentials({
    email: req.body.email,
    password: req.body.password,
  });
  const token = await user.generateAuthToken();
  return res.json({ status: 200, token });
});

router.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate('images');
  return res.json({ status: 200, user, images: user.images });
});
