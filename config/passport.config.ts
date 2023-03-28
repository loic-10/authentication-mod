import passport from "passport";

import { myApp } from "../server";

import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import util from "util";

import { googleAuth } from "./google";
import { facebookAuth } from "./facebook";

myApp.use(passport.initialize());
myApp.use(passport.session());

passport.serializeUser((user: any, done) => {
  console.log(
    util.inspect({ user, done }, { compact: true, depth: 5, breakLength: 80 })
  );
  done(null, user?.email);
});

passport.deserializeUser(async (email, done) => {
  console.log(
    util.inspect({ email, done }, { compact: true, depth: 5, breakLength: 80 })
  );
  try {
    const { request: req } = myApp;
    let user = {};
    try {
      // user = await userGetOneByEmail(req, email);
      // user.data.user.token = user.data.token;
      done(null, { user });
    } catch (e: any) {
      done(
        {
          msg: e?.response?.data?.msg || e?.message,
        },
        false
      );
    }
  } catch (e) {
    done(e);
  }
});

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      console.log(
        util.inspect(
          { email, password, done },
          { compact: true, depth: 5, breakLength: 80 }
        )
      );
      try {
        const user = {};
        // const { request: req } = myApp;
        // try {
        //   let { data } = await login(req, { email, password });
        //   done(null, data.user, { ...data });
        // } catch (e) {
        //   done(null, false, {
        //     msg: e.response ? e.response.data.msg : e.message,
        //   });
        // }
        done(null, { user });
      } catch (e) {
        done(e);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: googleAuth.client,
      clientSecret: googleAuth.secret,
      callbackURL: "/users/google/cb",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(
        util.inspect(
          { accessToken, refreshToken, profile, done },
          { compact: true, depth: 5, breakLength: 80 }
        )
      );
      try {
        const user = {};
        // try {
        //   user = await userGetOneByEmail(req, email);
        // } catch (e) {
        //   user = null;
        // }
        // if (user) {
        //   done(null, user.data.user);
        // } else {
        //   user = await userCreate(req, {
        //     username: name,
        //     first_name: given_name,
        //     last_name: family_name,
        //     email,
        //     googleId: sub,
        //     connexion_mode: "google",
        //     picture,
        //     language: locale,
        //   });
        //   done(null, user.data.user);
        // }
        done(null, { user });
      } catch (e: any) {
        done(e);
      }
    }
  )
);

passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID: facebookAuth.client_id,
      clientSecret: facebookAuth.secret,
      callbackURL: "/users/facebook/cb",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(
        util.inspect(
          { accessToken, refreshToken, profile, done },
          { compact: true, depth: 5, breakLength: 80 }
        )
      );
      try {
        const user = {};
        // const user = await findUserPerEmail(profile.emails[0].value);
        // if (user) {
        //   done(null, user);
        // } else {
        //   const newUser = new User({
        //     username: profile.displayName,
        //     local: {
        //       googleId: profile.id,
        //       email: profile.emails[0].value,
        //       connexion_mode: ["facebook"],
        //     },
        //     picture:
        //       profile.photos && profile.photos.length
        //         ? profile.photos[0].value
        //         : null,
        //   });
        //   const savedUser = await newUser.save();
        //   done(null, savedUser);
        // }
        done(null, { user });
      } catch (e) {
        done(e);
      }
    }
  )
);
