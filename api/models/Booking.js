import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "Pending",
    },
    totalDays: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    pickUpDate: {
      type: Date,
    },
    dropOffDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
