import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";

// ADD BOOKING
export const createBooking = async (req, res, next) => {
  const carId = req.params.carid;
  const userId = req.params.userid;
  const newBooking = new Booking(req.body);

  try {
    const savedBooking = await newBooking.save();

    try {
      // Insert booking data under car db (parent)
      (await Car.findByIdAndUpdate(carId, {
        $push: { booking: savedBooking._id },
      })) &&
        (await User.findByIdAndUpdate(userId, {
          $push: { booking: savedBooking._id },
        }));
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedBooking);
  } catch (err) {
    next(err);
  }
};

// UPDATE BOOKING
export const updateBooking = async (req, res, next) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedBooking);
  } catch (err) {
    next(err);
  }
};

// DELETE BOOKING
export const deleteBooking = async (req, res, next) => {
  const carId = req.params.carid;
  const userId = req.params.userid;
  try {
    await Booking.findByIdAndDelete(req.params.id);

    try {
      // Delete booking data under car db (parent)
      (await Car.findByIdAndUpdate(carId, {
        $pull: { booking: req.params.id },
      })) &&
        (await User.findByIdAndUpdate(userId, {
          $pull: { booking: req.params.id },
        }));
    } catch (err) {
      next(err);
    }

    res.status(200).json("Booking has been deleted");
  } catch (err) {
    next(err);
  }
};

// GET BOOKING
export const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

// GET ALL BOOKING
export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

// Get Booking Car's Details
export const getBookingCarDetails = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    const bookingDetails = await Car.find({ booking: booking._id });
    res.status(200).json(bookingDetails);
  } catch (err) {
    next(err);
  }
};

// Get Booking User's Details
export const getBookingUserDetails = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    const bookingDetails = await User.find({ booking: booking._id });
    res.status(200).json(bookingDetails);
  } catch (err) {
    next(err);
  }
};
