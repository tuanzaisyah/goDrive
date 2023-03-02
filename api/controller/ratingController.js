import Rating from "../models/Rating.js";
import User from "../models/User.js";
import Car from "../models/Car.js";

// ADD USER RATING
export const createUserRating = async (req, res, next) => {
  const userId = req.params.userid;
  const newRating = new Rating(req.body);

  try {
    const savedRating = await newRating.save();

    try {
      // Insert rating data under car db (parent)
      await User.findByIdAndUpdate(userId, {
        $push: { ratings: savedRating._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRating);
  } catch (err) {
    next(err);
  }
};

export const createCarRating = async (req, res, next) => {
  const carId = req.params.carid;

  const newRating = new Rating(req.body);

  try {
    const savedCarRating = await newRating.save();

    try {
      await Car.findByIdAndUpdate(carId, {
        $push: { ratings: savedCarRating._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedCarRating);
  } catch (err) {
    next(err);
  }
};
