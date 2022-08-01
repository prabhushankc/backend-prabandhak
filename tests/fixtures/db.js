const mongoose = require("mongoose");
const userDetail = require("../../models/user");
const Room = require("../../models/roomModel");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Anup",
  email: "anup.business7@gmail.com",
  password: "12345678",
  selectedFile:
    "https://firebasestorage.googleapis.com/v0/b/hms-agile.appspot.com/o/images%2Fabc.jpeg?alt=media&token=a0ae3cc2-dc01-48e8-8b6b-5e9292069df7",
  number: "9845222445",
  address: "Gongabu",
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Suraj",
  email: "anuplamsal7410@gmail.com",
  password: "12345678",
  selectedFile:
    "https://firebasestorage.googleapis.com/v0/b/hms-agile.appspot.com/o/images%2Fabc.jpeg?alt=media&token=a0ae3cc2-dc01-48e8-8b6b-5e9292069df7",
  number: "9845222445",
  address: "Bharatpur",
};

const roomOneId = new mongoose.Types.ObjectId();
const roomOne = {
  _id: roomOneId,
  user: userOneId,
  image:
    "https://firebasestorage.googleapis.com/v0/b/hms-agile.appspot.com/o/files%2FRoomImage2.jpg?alt=media&token=d75a55e5-4a62-483b-aaf4-ed77008f7440",
  title: "Sample Title",
  details: "Sample Details",
  standard: "Sample Standard",
  price: 100,
  capacity: 2,
  condition: "Normal",
  noofbeds: 3,
  rating: 4,
  numReviews: 1,
};

const roomTwoId = new mongoose.Types.ObjectId();
const roomTwo = {
  _id: roomTwoId,
  user: userTwoId,
  image:
    "https://firebasestorage.googleapis.com/v0/b/hms-agile.appspot.com/o/files%2FRoomImage4.jpg?alt=media&token=f41ba9b3-a3d6-483d-a239-48ec41d5e30f",
  title: "Sample Title",
  details: "Sample Details",
  standard: "Sample Standard",
  price: 200,
  capacity: 3,
  condition: "Normal",
  noofbeds: 3,
  rating: 4,
  numReviews: 1,
};

const setupDatabase = async () => {
  await userDetail.deleteMany();
  await Room.deleteMany();
  await new userDetail(userOne).save();
  await new userDetail(userTwo).save();
  await new Room(roomOne).save();
  await new Room(roomTwo).save();
};

module.exports = {
  userOne,
  userOneId,
  userTwo,
  userTwoId,
  roomOneId,
  roomOne,
  setupDatabase,
};
