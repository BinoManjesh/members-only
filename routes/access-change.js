import { Router } from "express";
import { body, validationResult } from "express-validator";
import { ensureLoggedin } from "../utils/middlewares.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import User from "../models/user.js";

const router = Router();

router.use("/change-membership", ensureLoggedin);

router.get("/change-membership", (req, res) => {
  res.render("access-change");
});

router.post(
  "/change-membership",
  body("password", "Wrong password").custom(
    (password) => password === process.env.MEMBERSHIP_PASSWORD
  ),
  body("accessLevel", "Invalid membership type").custom(
    (accessLevel) => 0 <= accessLevel && accessLevel <= 2
  ),
  asyncWrapper(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render("access-change", { errors: result.array() });
    }
    console.log("okay");
    await User.findByIdAndUpdate(req.user._id, {
      accessLevel: req.body.accessLevel,
    });
    res.redirect("/");
  })
);

export default router;
