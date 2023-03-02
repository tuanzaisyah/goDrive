import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    rating: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rating", RatingSchema);
