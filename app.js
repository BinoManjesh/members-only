import express from "express";
import createError from "http-errors";
import logger from "morgan";
import "dotenv/config";
import mongoose from "mongoose";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import session from "express-session";
import MongoStore from "connect-mongo";
import Debug from "debug";
const debug = Debug("members-only:server");

import { fileURLToPath } from "url";
import path from "path";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

import User from "./models/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  debug("Connected to database");
});

passport.use(
  new LocalStrategy(async function verify(username, password, done) {
    try {
      const message = "Incorrect username or password";
      const user = await User.find({ username }).exec();
      if (!user) {
        return done(null, false, { message });
      }
      const comparison = await bcrypt.compare(password, user.password);
      if (!comparison) {
        return done(null, false, { message });
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
  })
);
app.use(passport.authenticate("session"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  req.session.bruh = "hahaha";
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
