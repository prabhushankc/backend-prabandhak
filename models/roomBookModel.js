import mongoose from "mongoose";

const roomOrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserDetails",
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"] },
  phnumber: { type: String, required: [true, "Phone Number is required"] },
  noofguests: {
    type: Number,
    required: [true, "Please enter number of guests"],
  },
  bookingDate: {
    type: Date,
    required: [true, "Date is required"],
    default: Date.now,
  },
  noofdays: {
    type: Number,
    required: [true, "Please enter number of days"],
    default: 1,
  },
  isBooked: {
    type: Boolean,
    required: true,
    default: false,
  },
  isApproved: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const RoomBook = mongoose.model("RoomBook", roomOrderSchema);

export default RoomBook;
