const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const roomRoutes = require("./routes/roomRoute.js");
const roomBookRoute = require("./routes/roomBookRoute.js");
const contactUs = require("./routes/contactRoute.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const userRoutes = require("./routes/users.js");
const homePageRoutes = require("./routes/homePage.js");
const foodPageRoutes = require("./routes/foodPage.js");
const paymentRoutes = require("./routes/payment.js");
const morgan = require("morgan");

const app = express();

dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/user", userRoutes);
app.use("/homePage", homePageRoutes);
app.use("/foodPage", foodPageRoutes);
app.use("/payment", paymentRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/booked/rooms", roomBookRoute);
app.use("/api/contact", contactUs);
app.get("/", (req, res) => {
  res.send("Hello this is HMS");
});

// Using morgan for dev dependancy
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Setting up own error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;

// mongoose
//   .connect(process.env.CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => app.listen(PORT, console.log(`Server running ${PORT}`)))
//   .catch(error => console.log(error));

mongoose
  .connect(process.env.Anup_Mongo_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, console.log(`Server running ${PORT}`)))
  .catch(error => console.log(error));

module.exports = app;
