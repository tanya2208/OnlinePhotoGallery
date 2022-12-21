import express from "express";
import { User } from "../models/user.model.js";
import ErrorHandler from "../middlewares/ErrorHandler.js";
import AuthHandler from "../middlewares/AuthHandler.js";

export const router = new express.Router();

router.post("/users/register", ErrorHandler(async (req, res) => {
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
  })
);

router.post("/users/login", ErrorHandler(async (req, res) => {
    const user = await User.findByCredentials({
        email: req.body.email,
        password: req.body.password,
    });
    const token = await user.generateAuthToken();
    return res.json({ status: 200, token });
}));

router.post('/users/logout', AuthHandler, ErrorHandler(async (req, res) => {
    req.user.tokens = req.user.tokens.filter(token => {
        return token.token !== req.token
    })
    await req.user.save()
    return res.json({status: 200})
}));
