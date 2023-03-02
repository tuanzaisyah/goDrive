import express from "express";
import {
  createBooking,
  deleteBooking,
  getBooking,
  getBookingCarDetails,
  getBookings,
  getBookingUserDetails,
  updateBooking,
} from "../controller/bookingController.js";
import { verifyOwner } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/:carid/:userid", createBooking);

router.put("/:id", verifyOwner, updateBooking);

router.delete("/:id/:carid/:userid", deleteBooking);

router.get("/:id", getBooking);

router.get("/:id", getBookings);

router.get("/car/:id", getBookingCarDetails);

router.get("/booking/:id", getBookingUserDetails);

export default router;
