import express from "express";
import users from "./users";
import home from "./home";
const router = express.Router();

router.use("/", home);
router.use("/users", users);

router.get("/*", (req, res) => {
  res.render("errors", { code: 404, response: null });
});

router.post("/*", (req, res) => {
  res.render("errors", { code: 404, response: null });
});

export default router;
