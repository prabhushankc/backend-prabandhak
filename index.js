import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import roomRoutes from "./routes/roomRoute.js";
import roomBookRoute from "./routes/roomBookRoute.js";
import contactUs from "./routes/contactRoute.js";
import userRoutes from "./routes/users.js";
import homePageRoutes from "./routes/homePage.js";
import foodPageRoutes from "./routes/foodPage.js";
import paymentRoutes from "./routes/payment.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/user", userRoutes);
app.use("/homepage", homePageRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/booked/rooms", roomBookRoute);
app.use("/api/contact/us", contactUs);
app.use("/foodPage", foodPageRoutes);
app.use("/payment", paymentRoutes);

// Using morgan for dev dependancy
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Setting up own error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => app.listen(PORT, console.log(`Server running ${PORT}`)))
//   .catch(error => console.log(error));

mongoose
  .connect(process.env.Anup_Mongo_URL)
  .then(() => app.listen(PORT, console.log(`Server running ${PORT}`)))
  .catch(error => console.log(error));
