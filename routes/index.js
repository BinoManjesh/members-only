import express from "express";
import signUpRouter from "./sign-up.js";
import loginRouter from "./login.js";

const router = express.Router();

router.use(signUpRouter);
router.use(loginRouter);

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

export default router;
