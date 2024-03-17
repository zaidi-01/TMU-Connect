import { ROUTES } from "@contants";
import { authenticate } from "@middlewares";
import { PrismaClient } from "@prisma/client";
import { adRoutes, authRoutes, userRoutes } from "@routes";
import { websocketService } from "@services";
import { Password } from "@utilities";
import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi, { SwaggerUiOptions } from "swagger-ui-express";

// TODO: Move initializations to their own files.

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

/** Swagger */
const swaggerUiOptions: SwaggerUiOptions = {
  explorer: true,
};
const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "TMU-Connect API",
      version: "0.1.0",
      description:
        "This is the API documentation for the TMU-Connect application.",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Development server",
      },
    ],
  },
  apis: [
    "./src/enums/**/*.enum.ts",
    "./src/models/**/*.model.ts",
    "./src/routes/**/*.routes.ts",
    "./src/controllers/**/*.model.ts",
  ],
};
const swaggerSpecs = swaggerJSDoc(swaggerOptions);

/** Middlewares */
app.use(express.json());
app.use(passport.initialize());
app.use(
  ROUTES.DOCS_ROUTE.BASE,
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, swaggerUiOptions)
);

/** Routes */
app.use(ROUTES.AUTH.BASE, authRoutes);
app.use(ROUTES.AD.BASE, authenticate(), adRoutes);
app.use(ROUTES.USER.BASE, authenticate(), userRoutes);

const http = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/** Websocket server */
http.on("upgrade", (request, socket, head) => {
  if (request.url !== "/ws") {
    socket.destroy();
    return;
  }

  // TODO: Refactor this to use the authenticate middleware once token is stored in a cookie.
  try {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    if (!token) {
      socket.destroy();
      return;
    }

    const jwtPayload = jwt.verify(token, "secret") as JwtPayload;

    prisma.user
      .findUnique({
        where: {
          id: jwtPayload.id,
        },
      })
      .then((user) => {
        if (!user) {
          socket.destroy();
          return;
        }

        websocketService.handleUpgrade(request, socket, head, user.id);
      });
  } catch (error) {
    socket.destroy();
  }
});
