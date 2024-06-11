import { Router } from "express";
import Message from "../models/message.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import { ensureLoggedin } from "../utils/middlewares.js";

const router = Router();

router.use("/new-message", ensureLoggedin);

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
