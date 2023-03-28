import express from "express";

const app = express();
import path from "path";
import morgan from "morgan";
import index from "./routes";

const PORT = process.env.PORT || 2000;
import cookieParser from "cookie-parser";

app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use((req, res, next) => {
  app.request = req;
  next();
});

// locals
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.disable("etag");

const options = { etag: false, dotfiles: "allow", maxAge: "1d" };

app.use(morgan("short"));
app.use(express.static(path.join(__dirname, "assets"), options));
app.use(express.json());
app.use(express.urlencoded({ extended: false, inflate: false }));
app.use(index);

const APP = app.listen(PORT, () => {
  console.log(`Authentication mod, launch to http://localhost:${PORT}`);
});

export const myApp = app;

import "./config/passport.config";
