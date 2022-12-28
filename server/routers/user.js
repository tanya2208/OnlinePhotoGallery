import express from "express";
import { User } from "../models/user.model.js";
import AuthHandler from "../middlewares/AuthHandler.js";
import 'express-async-errors';

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
  }
);

router.post("/users/login", async (req, res, next) => {
    const user = await User.findByCredentials({
        email: req.body.email,
        password: req.body.password
    });
    const token = await user.generateAuthToken();
    return res.json({ status: 200, token });
});

router.post('/users/logout', AuthHandler, async (req, res) => {
    req.user.tokens = req.user.tokens.filter(token => {
        return token.token !== req.token
    })
    await req.user.save()
    return res.json({status: 200})
});

