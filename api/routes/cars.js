import express from "express";
import {
  createCar,
  deleteCar,
  getCar,
  getCarBookingList,
  getCarOwnerDetails,
  getCarRating,
  getCars,
  updateCar,
} from "../controller/carController.js";

import { verifyOwner } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/:userid", verifyOwner, createCar);

router.put("/:id", verifyOwner, updateCar);

router.delete("/:id/:userid", verifyOwner, deleteCar);

router.get("/find/:id", getCar);

router.get("/", verifyOwner, getCars);

router.get("/:id", getCarOwnerDetails);

router.get("/bookings/:id", getCarBookingList);

router.get("/car/:id", getCarRating);

export default router;
