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
    // image,
  } = req.body;

  const room = await Room.create({
    title,
    image: "/images/roomFirst.jpg",
    user: req.userId,
    details,
    standard,
    price,
    capacity,
    condition,
    noofbeds,
  });

  res.status(201).json(room);
});

export { createRoom, getRooms };
