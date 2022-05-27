import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import roomRoutes from "./routes/roomRoute.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/users.js";
import homePageRoutes from "./routes/homePage.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/user", userRoutes);
app.use("/homepage", homePageRoutes);
app.use("/api/rooms", roomRoutes);

// Using morgan for dev dependancy
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Setting up own error middleware
app.use(notFound);
app.use(errorHandler);
app.use("/user", userRoutes);
app.use("/homePage", homePageRoutes);
app.get("/", (req, res) => {
  res.send("Hello this is HMS");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, console.log(`Server running ${PORT}`)))
  .catch(error => console.log(error));

// mongoose
//   .connect(process.env.Anup_Mongo_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => app.listen(PORT, console.log(`Server running ${PORT}`)))
//   .catch(error => console.log(error));
