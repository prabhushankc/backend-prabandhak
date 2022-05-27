import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedData = jwt.verify(token, process.env.JWT);

      // Get user from the token
      req.userId = decodedData?.id;
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin === 1) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { auth, isAdmin };
