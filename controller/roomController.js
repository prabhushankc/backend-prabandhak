import asyncHandler from "express-async-handler";
import Room from "../models/roomModel.js";

// @description   Fetch all Rooms
// @route         GET /api/rooms
// @access        Admin/Private
const getRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find({});

  res.json(rooms);
});

// @description   Create a Room
// @route         POST /api/products
// @access        Admin/Private
const createRoom = asyncHandler(async (req, res) => {
  const {
    title,
    details,
    standard,
    price,
    capacity,
    condition,
    noofbeds,
    image,
  } = req.body;

  const room = new Room({
    title,
    image,
    user: req.userId,
    details,
    standard,
    price,
    capacity,
    condition,
    noofbeds,
  });

  await room.save();

  res.status(201).json(room);
});

const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    throw new Error("Room not found");
    res.status(404);
    return;
  }

  await room.remove();

  res.json({ message: "Room Deleted" });
});

export { createRoom, getRooms, deleteRoom };
