import express from "express";
import signUpRouter from "./sign-up.js";
const router = express.Router();

router.use(signUpRouter);

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

export default router;
