import { adRoutes, authRoutes, userRoutes } from "@routes";
import express from "express";

const app = express();
const port = process.env.PORT || 5000;

app.use("/ad", adRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
