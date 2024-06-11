import { Router } from "express";
import Message from "../models/message.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import { ensureLoggedin } from "../utils/middlewares.js";

const router = Router();

router.use("/messages/new", ensureLoggedin);

router.get("/messages/new", (req, res) => {
  res.render("new-message");
});

router.post(
  "/messages/new",
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

router.post(
  "/messages/:id/delete",
  asyncWrapper(async (req, res) => {
    if (!req.user || req.user.accessLevel < 2) {
      return res.redirect("/");
    }
    await Message.findByIdAndDelete(req.params.id);
    res.redirect("/");
  })
);

export default router;
