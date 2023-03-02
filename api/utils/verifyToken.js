import jwt from "jsonwebtoken";
import { createError } from "./error.js";

// VERIFY TOKEN
export const verifyToken = (req, res, next) => {
  // Check has token or not
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  // Verify token
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

// VERIFY USER
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

// VERIFY OWNER
export const verifyOwner = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isOwner) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
