import express from "express";
import {
  deleteUser,
  getOwnerCars,
  getUser,
  getUserBooking,
  getUserRating,
  getUsers,
  updateUser,
} from "../controller/userController.js";
import { verifyOwner, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// // Check Authentication (Token)
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("hello user, you are logged in");
// });

// // Check User
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, you are logged in and can manage your account");
// });

// // Check Owner
// router.get("/checkowner/:id", verifyOwner, (req, res, next) => {
//   res.send("hello owner, you are logged in and can manage dashboard");
// });

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:id", verifyUser, getUser);

router.get("/", verifyUser, getUsers);

router.get("/car/:id", getOwnerCars);

router.get("/booking/:id", getUserBooking);

router.get("/user/:id", getUserRating);

export default router;
