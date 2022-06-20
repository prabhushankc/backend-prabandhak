import asyncHandler from "express-async-handler";
import Room from "../models/roomModel.js";

// @description   Get Room By Id
// @route         GET /api/rooms/:id
// @access        Admin/Private
const getRoomById = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id).populate({
    path: "UserDetails",
    select: "name",
    strictPopulate: false,
  });

  if (!room) {
    res.status(404);
    throw new Error("Room not found");
    return;
  }

  res.json(room);
});

// @description   Fetch all Rooms
// @route         GET /api/rooms?keyword=""
// @access        Admin/Private
const getRooms = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const { sort } = req.query;
  const SORT = sort || "createdAt";

  const rooms = await Room.find({ ...keyword }).sort(SORT);
  res.json(rooms);
});

// @description   Create a Room
// @route         POST /api/rooms
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

// @description   Update Room
// @route         PUT /api/rooms/:id
// @access        Admin/Private
const updateRoom = asyncHandler(async (req, res) => {
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

  const room = await Room.findById(req.params.id);

  if (!room) {
    res.status(404);
    throw new Error("Room not found");
    return;
  }

  room.title = title;
  room.details = details;
  room.standard = standard;
  room.price = price;
  room.capacity = capacity;
  room.condition = condition;
  room.noofbeds = noofbeds;
  room.image = image;

  const updatedRoom = await room.save();
  res.status(201).json(updatedRoom);
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

export { createRoom, getRooms, getRoomById, updateRoom };

