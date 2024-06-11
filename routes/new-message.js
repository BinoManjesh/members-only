import { Router } from "express";
import Message from "../models/message.js";
import asyncWrapper from "../utils/asyncWrapper.js";

const router = Router();

router.use("/new-message", (req, res, next) => {
  if (!req.user) {
    res.redirect("/login");
  } else {
    next();
  }
});

router.get("/new-message", (req, res) => {
  res.render("new-message");
});

router.post(
  "/new-message",
  asyncWrapper(async (req, res) => {
    const message = new Message({
      title: req.body.title,
      content: req.body.content,
      user: req.user._id,
    });
    await message.save();
    res.redirect("/");
  })
);

export default router;
