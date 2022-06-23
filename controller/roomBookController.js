import asyncHandler from "express-async-handler";
import RoomBook from "../models/roomBookModel.js";
import Room from "../models/roomModel.js";

// @description   Book a room
// @route         POST /api/booked/rooms
// @access        Private
const addBookRooms = asyncHandler(async (req, res) => {
  const { name, email, phnumber, noofguests, bookingDate, noofdays } = req.body;

  const roomData = await Room.findById(req.params.id);

  if (!roomData) {
    res.status(400);
    throw new Error("Invalid Room Id");
    return;
  }

  const bookedRoom = new RoomBook({
    user: req.userId,
    room: req.params.id,
    name,
    email,
    phnumber,
    noofguests,
    bookingDate,
    noofdays,
  });

  bookedRoom.save();

  res.status(201).json(bookedRoom);
});

// @description   Get all booked rooms
// @route         GET /api/booked/rooms
// @access        Private/Admin
const getBookedRooms = asyncHandler(async (req, res) => {
  const roomData = await RoomBook.find({});

  res.json(roomData);
});

// @description   Get my booked rooms
// @route         GET /api/booked/rooms/me
// @access        Private/
const getMyBookedRooms = asyncHandler(async (req, res) => {
  const roomData = await RoomBook.find({ user: req.userId }).populate({
    path: "room",
    select: ["image", "standard", "price"],
    strictPopulate: false,
  });

  if (!roomData) {
    res.status(404);
    throw new Error("No Booked Rooms");
    return;
  }

  res.json(roomData);
});

// @description   Delete my booked rooms
// @route         DELETE /api/booked/rooms/:id
// @access        Private/Admin & Private
const deleteBookedRooms = asyncHandler(async (req, res) => {
  const roomData = await RoomBook.findById(req.params.id);

  if (!roomData) {
    res.status(404);
    throw new Error("No Such Booked Rooms");
    return;
  }

  await roomData.remove();

  res.json({ message: "Booked Room Deleted" });
});

export { addBookRooms, getBookedRooms, getMyBookedRooms, deleteBookedRooms };
