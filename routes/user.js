import { Router } from "express";
import { body, validationResult } from "express-validator";
import { ensureLoggedin } from "../utils/middlewares.js";
import asyncWrapper from "../utils/asyncWrapper.js";

const router = Router();

router.use("/user", ensureLoggedin);

router.get("/user/accessLevel/update", (req, res) => {
  res.render("access-change");
});

router.post(
  "/user/accessLevel/update",
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
    req.user.accessLevel = req.body.accessLevel;
    await req.user.save();
    res.redirect("/");
  })
);

export default router;
