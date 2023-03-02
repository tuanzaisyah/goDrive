import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";
import Rating from "../models/Rating.js";

// UPDATE USER
export const updateUser = async (req, res, next) => {
  // encrypt password when update
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  // update user details
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      // return updated file
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// DELETE USER
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(err);
  }
};

// GET USER
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// GET ALL USER
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Get Owner Cars
export const getOwnerCars = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const list = await Promise.all(
      user.car.map((car) => {
        return Car.findById(car);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// Get User Booking
export const getUserBooking = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const list = await Promise.all(
      user.booking.map((booking) => {
        return Booking.findById(booking);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// Get User's Rating
export const getUserRating = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const list = await Promise.all(
      user.ratings.map((rating) => {
        return Rating.findById(rating);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
