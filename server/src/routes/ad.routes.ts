import express from "express";

export const router = express.Router();

// TODO: Add more routes here
router.get("/", (_, res) => {
  res.send("Ad routes");
});

export default router;
