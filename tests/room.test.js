const Room = require("../models/roomModel");
const mongoose = require("mongoose");
const { userOneId } = require("./fixtures/db");
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

describe("Test for Creating Room", () => {
  it("Test for Create Room", async () => {
    const createRoom = {
      user: userOneId,
      image:
        "https://firebasestorage.googleapis.com/v0/b/hms-agile.appspot.com/o/files%2Fpexels-pixabay-271619.jpg?alt=media&token=e085b187-f0da-4581-a744-7ce8ec3e47b6",
      title: "Sample Title",
      details: "Sample Details",
      standard: "Sample Standard",
      price: 500,
      capacity: 2,
      condition: "Normal",
      noofbeds: 3,
      rating: 4,
      numReviews: 1,
    };
    return Room.create(createRoom).then(res => {
      expect(res.price).toEqual(500);
    });
  });
});

describe("Test for Room Schema", () => {
  // the code below is for insert testing
  it("Test for get Room", async () => {
    const room = await Room.findOne({ _id: "62e7c9ab8c6d26e9ebe4aa56" });
    expect(room.ok);
  });
});

describe("Test for Room Schema", () => {
  // the code below is for insert testing
  it("Test for get Room", async () => {
    const room = await Room.find({});
    expect(room.ok);
  });
});

describe("Test for Room Schema", () => {
  // the code below is for insert testing
  it("Test for delete Room", async () => {
    const room = await Room.findByIdAndDelete({
      _id: "62e7c9ab8c6d26e9ebe4aa56",
    });
    expect(room.ok);
  });
});
