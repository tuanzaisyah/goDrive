import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    seater: {
      type: String,
      required: true,
    },
    petrol: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pickUpLocation: {
      type: String,
      required: true,
    },
    dropOffLocation: {
      type: String,
      required: true,
    },
    ssm: {
      type: String,
      required: true,
    },
    roadtax: {
      type: String,
      required: true,
    },
    frontPic: {
      type: String,
    },
    backPic: {
      type: String,
    },
    interiorPic: {
      type: String,
    },
    booking: {
      type: [String],
    },
    ratings: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Car", CarSchema);
