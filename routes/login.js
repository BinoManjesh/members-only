import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/login/:error?", (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("login", { error: req.params.error });
});

router.post(
  "/login",
  (req, res, next) => {
    if (req.user) {
      return res.redirect("/");
    }
    next();
  },
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
