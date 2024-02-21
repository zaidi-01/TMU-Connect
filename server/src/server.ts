import { adRoutes, authRoutes, userRoutes } from "@routes";
import express from "express";
import { ROUTES } from "./constants/routes.constants";

const app = express();
const port = process.env.PORT || 5000;

app.use(ROUTES.AD.ROOT, adRoutes);
app.use(ROUTES.AUTH.ROOT, authRoutes);
app.use(ROUTES.USER.ROOT, userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
