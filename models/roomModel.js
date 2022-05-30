import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "UserDetails",
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  details: {
    type: String,
    required: [true, "Details is required"],
  },
  standard: {
    type: String,
    required: [true, "Standard is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    default: 0,
  },
  capacity: {
    type: Number,
    required: [true, "Capacity is required"],
    default: 0,
  },
  condition: {
    type: String,
    required: [true, "Condition is required"],
  },
  noofbeds: {
    type: Number,
    required: [true, "No Of Beds is required"],
    default: 0,
  },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
