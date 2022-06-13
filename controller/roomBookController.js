import asyncHandler from "express-async-handler";
import RoomBook from "../models/roomBookModel.js";
import Room from "../models/roomModel.js";

// @description   Book a room
// @route         POST /api/book/room
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
// @route         GET /api/book/room
// @access        Private/Admin
const getBookedRooms = asyncHandler(async (req, res) => {
  const roomData = await RoomBook.find({});

  res.json(roomData);
});

export { addBookRooms, getBookedRooms };
