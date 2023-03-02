import express from "express";
import {
  createCarRating,
  createUserRating,
} from "../controller/ratingController.js";

const router = express.Router();

router.post("/:userid", createUserRating);

router.post("/find/:carid", createCarRating);

export default router;
