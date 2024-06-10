import { Router } from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import asyncWrapper from "../utils/asyncWrapper.js";

const router = Router();

router.get("/sign-up", (req, res) => {
  res.render("sign-up", { title: "bruh" });
});

router.post(
  "/sign-up",
  body("username")
    .isLength({ min: 1 })
    .withMessage("Username should have atleast 1 character")
    .bail()
    .custom(async (username) => {
      if (await User.exists({ username }).exec()) {
        throw new Error("Username already in use");
      }
    }),
  body("password")
    .isLength({ min: 8, max: 18 })
    .withMessage("Password should have between 8 and 18 characters"),
  body("confirmPassword", "Password and confirmation must match").custom(
    (confirmPassword, { req }) => confirmPassword === req.body.password
  ),
  asyncWrapper(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render("sign-up", {
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        errors: result.array(),
      });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      accessLevel: 0,
    });
    await user.save();
    res.redirect("/");
  })
);

export default router;
