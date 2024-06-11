import { Router } from "express";
import passport from "passport";

const router = Router();

router.use("/login/:error?", (req, res, next) => {
  if (req.user) {
    res.redirect("/");
  } else {
    next();
  }
});

router.get("/login/:error?", (req, res) => {
  res.render("login", { error: req.params.error });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login/error=1",
  })
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default router;
