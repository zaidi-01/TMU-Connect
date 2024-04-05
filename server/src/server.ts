import { COOKIE_NAME, RELATIVE_ROUTES, ROUTES } from "@constants";
import { authenticate } from "@middlewares";
import { PrismaClient } from "@prisma/client";
import { adRoutes, authRoutes, userRoutes } from "@routes";
import { fileService, webSocketService } from "@services";
import { Password } from "@utilities";
import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import passport from "passport";
import { Strategy as CookieStrategy } from "passport-cookie";
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
      .then(async (user) => {
        if (!user) {
          return done(createHttpError(400, "Invalid email or password"));
        }

        const isMatch = await Password.comparePassword(user.password, password);
        if (isMatch) {
          return done(null, user);
        }

        done(createHttpError(400, "Invalid email or password"));
      })
      .catch((error) => {
        console.error(error);
        done(error);
      });
  })
);

// JWT strategy
// TODO: Remove if not needed in the future.
// TODO: Remove TokenDto along with this strategy.
// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   // TODO: Change this secret to something more secure or add a provider for secret.
//   secretOrKey: "secret",
// };
// passport.use(
//   new JwtStrategy(jwtOptions, (jwtPayload, done) => {
//     prisma.user
//       .findUnique({
//         where: {
//           id: jwtPayload.id,
//         },
//       })
//       .then((user) => {
//         if (user) {
//           return done(null, user);
//         }

//         return done(null, false);
//       })
//       .catch((error) => {
//         return done(error, false);
//       });
//   })
// );

// Cookie strategy
const cookieOptions = {
  cookieName: COOKIE_NAME,
  signed: false,
  passReqToCallback: false,
};
passport.use(
  new CookieStrategy(cookieOptions, (token: string, done: any) => {
    // TODO: Change this secret to something more secure or add a provider for secret.
    const jwtPayload = jwt.verify(token, "secret") as JwtPayload;

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
  swaggerOptions: {
    tagsSorter: "alpha",
    operationsSorter: "alpha",
    persistAuthorization: true,
  },
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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./src/enums/**/*.enum.ts",
    "./src/models/**/*.model.ts",
    "./src/routes/**/*.routes.ts",
    "./src/controllers/**/*.enum.ts",
    "./src/controllers/**/*.model.ts",
  ],
};
const swaggerSpecs = swaggerJSDoc(swaggerOptions);

/** Middlewares */
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
if (process.env.NODE_ENV !== "production") {
  app.use(
    ROUTES.DOCS_ROUTE.BASE,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs, swaggerUiOptions)
  );
}

/** Routes */
app.use(ROUTES.AUTH.BASE, authRoutes);
app.use(ROUTES.AD.BASE, authenticate(), adRoutes);
app.use(ROUTES.USER.BASE, authenticate(), userRoutes);

/** Static files */

// Serve client files in production
if (process.env.NODE_ENV === "production") {
  const CLIENT_DIST = "../client/dist";
  app.use(express.static(CLIENT_DIST));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root: `${CLIENT_DIST}` });
  });
}

// Serve uploads directory
app.use(RELATIVE_ROUTES.UPLOADS, express.static(fileService.BASE_PATH));

/** Error handling middleware */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Handle HTTP errors
  if (err instanceof HttpError) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Handle other errors
  console.error(err);
  return res
    .status(500)
    .json({ message: "An error occurred. Please try again." });
});

const http = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/** Websocket server */
http.on("upgrade", (request, socket, head) => {
  if (request.url !== RELATIVE_ROUTES.WS) {
    socket.destroy();
    return;
  }

  // TODO: Refactor this to use the authenticate middleware once token is stored in a cookie.
  try {
    const token = request.headers.cookie?.split("=")[1].split(";")[0];
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

        webSocketService.handleUpgrade(request, socket, head, user.id);
      });
  } catch (error) {
    socket.destroy();
  }
});
