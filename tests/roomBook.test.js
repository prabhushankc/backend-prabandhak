const RoomBook = require("../models/roomBookModel");
const mongoose = require("mongoose");
const { userOneId, userTwoId, roomOneId } = require("./fixtures/db");
const url = "mongodb://localhost:27017/HMS-Agile";

beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Test for Room Booking", () => {
  it("Test for Book Room", async () => {
    const createRoomBook = {
      user: userTwoId,
      room: roomOneId,
      name: "Anup",
      email: "anup@gmail.com",
      phnumber: "9845555554",
      noofguests: 2,
      noofdays: 3,
    };
    return RoomBook.create(createRoomBook).then(res => {
      expect(res.phnumber).toEqual("9845555554");
    });
  });
});

describe("Test for Room Booking Schema", () => {
  // the code below is for insert testing
  it("Test for get Room Booking", async () => {
    const roomBook = await RoomBook.findOne({
      _id: "62e7c9aaf6403e8be2f954d3",
    });
    expect(roomBook.ok);
  });
});

describe("Test for Room Booking Schema", () => {
  // the code below is for insert testing
  it("Test for get Room Booking", async () => {
    const roomBook = await RoomBook.find({});
    expect(roomBook.ok);
  });
});

describe("Test for Room Booking Schema", () => {
  // the code below is for insert testing
  it("Test for delete Room Booking", async () => {
    const roomBook = await RoomBook.findByIdAndDelete(
      "62e7c9aaf6403e8be2f954d3"
    );
    expect(roomBook.ok);
  });
});
