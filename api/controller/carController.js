import Car from "../models/Car.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Rating from "../models/Rating.js";

// ADD CAR
export const createCar = async (req, res, next) => {
  const userId = req.params.userid;
  const newCar = new Car(req.body);

  try {
    const savedCar = await newCar.save();

    try {
      // Insert car data under user db (parent)
      await User.findByIdAndUpdate(userId, {
        $push: { car: savedCar._id },
      });
    } catch (err) {
      next(err);
    }

    res.status(200).json(savedCar);
  } catch (err) {
    next(err);
  }
};

// UPDATE CAR
export const updateCar = async (req, res, next) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      // return updated file
      { new: true }
    );
    res.status(200).json(updatedCar);
  } catch (err) {
    next(err);
  }
};

// DELETE CAR
export const deleteCar = async (req, res, next) => {
  const userId = req.params.userid;

  try {
    await Car.findByIdAndDelete(req.params.id);

    try {
      // Delete car data under user db (parent)
      await User.findByIdAndUpdate(userId, {
        $pull: { car: req.params.id },
      });
    } catch (err) {
      next(err);
    }

    res.status(200).json("Car has been deleted");
  } catch (err) {
    next(err);
  }
};

// GET CAR
export const getCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
};

// GET ALL CAR
export const getCars = async (req, res, next) => {
  try {
    const cars = await Car.find(req.query);
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
};

// Get Car's Owner Details
export const getCarOwnerDetails = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);

    const ownerDetails = await User.find({ car: car._id });
    res.status(200).json(ownerDetails);
  } catch (err) {
    next(err);
  }
};

// Get Owner Car's Booking List
export const getCarBookingList = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    const list = await Promise.all(
      car.booking.map((booking) => {
        return Booking.findById(booking);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// Get Car's Rating
export const getCarRating = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    const list = await Promise.all(
      car.ratings.map((rating) => {
        return Rating.findById(rating);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
