import express from "express";
import signUpRouter from "./sign-up.js";
import loginRouter from "./login.js";
import newMessageRouter from "./new-message.js";
import accessChangeRouter from "./access-change.js";
import Message from "../models/message.js";
import asyncWrapper from "../utils/asyncWrapper.js";

const router = express.Router();

router.use(signUpRouter);
router.use(loginRouter);
router.use(newMessageRouter);
router.use(accessChangeRouter);

router.get(
  "/",
  asyncWrapper(async function (req, res) {
    const messages = await Message.find({}).populate("user").exec();
    res.render("index", { messages });
  })
);

export default router;
