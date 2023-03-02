import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import carsRoute from "./routes/cars.js";
import bookingsRoute from "./routes/bookings.js";
import ratingsRoute from "./routes/ratings.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

// Connect MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

// Routes for RestAPI (middlewares)
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/cars", carsRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/ratings", ratingsRoute);

// Error Handling
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Server port and status
app.listen(8800, () => {
  connect();
  console.log("Connected to backend");
});
