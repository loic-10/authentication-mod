import passport from "passport";

export const signInGet = async (req, res, next) => {
  try {
    res.render("users/sign-in");
  } catch (e) {
    next(e);
  }
};

export const googleAuth = (req, res, next) => {
  passport.authenticate("google", {
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  })(req, res, next);
};

export const googleAuthCb = (req, res, next) => {
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/users/sign-in",
  })(req, res, next);
};

export const facebookAuth = (req, res, next) => {
  passport.authenticate("facebook", {
    scope: ["email"],
  })(req, res, next);
};

export const facebookAuthCb = (req, res, next) => {
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/users/sign-in",
  })(req, res, next);
};
