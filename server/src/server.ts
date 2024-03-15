import { ROUTES } from "@contants";
import { authenticate } from "@middlewares";
import { PrismaClient } from "@prisma/client";
import { adRoutes, authRoutes, userRoutes } from "@routes";
import { websocketService } from "@services";
import { Password } from "@utilities";
import express from "express";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

/** Prisma client */
const prisma = new PrismaClient();

/* Passport middlewares */

// Local strategy
const localOptions = {
  usernameField: "email",
  passwordField: "password",
};
passport.use(
  new LocalStrategy(localOptions, (email, password, done) => {
    prisma.user
      .findUnique({
        where: {
          email,
        },
      })
      .then((user) => {
        if (!user) {
          return done(null, false);
        }

        return Password.comparePassword(user.password, password).then(
          (isMatch) => {
            if (isMatch) {
              return done(null, user);
            }

            return done(null, false);
          }
        );
      })
      .catch((error) => {
        return done(error, false);
      });
  })
);

// JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // TODO: Change this secret to something more secure or add a provider for secret.
  secretOrKey: "secret",
};
passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    prisma.user
      .findUnique({
        where: {
          id: jwtPayload.id,
        },
      })
      .then((user) => {
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      })
      .catch((error) => {
        return done(error, false);
      });
  })
);

/** Express app */
const app = express();
const port = process.env.PORT || 5000;

/** Middlewares */
app.use(express.json());
app.use(passport.initialize());

/** Routes */
app.use(ROUTES.AUTH.ROOT, authRoutes);
app.use(ROUTES.AD.ROOT, authenticate(), adRoutes);
app.use(ROUTES.USER.ROOT, authenticate(), userRoutes);

const http = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/** Websocket server */
http.on("upgrade", websocketService.handleUpgrade);
