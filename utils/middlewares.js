export function ensureLoggedin(req, res, next) {
  if (!req.user) {
    res.redirect("/login");
  } else {
    next();
  }
}
