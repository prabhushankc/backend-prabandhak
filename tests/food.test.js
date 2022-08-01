const Food = require("../models/foodPage");
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

// describe("Test for Creating Food", () => {
//   it("Test for Create Food", async () => {
//     const createFood = {
//       selectedFile:
//         "https://firebasestorage.googleapis.com/v0/b/hms-agile.appspot.com/o/files%2Fsausage.jpg?alt=media&token=2bdd9fc3-41ed-4bb8-b025-a7ad74ab54e7",
//       title: "Chicken Sausage",
//       description: "Nice Sausage",
//       price: "100",
//       tags: ["Chicken Sausage"],
//       quantity: 2,
//     };
//     return Food.create(createFood).then(res => {
//       expect(res.price).toEqual("100");
//     });
//   });
// });

describe("Test for Food Schema", () => {
  // the code below is for insert testing
  it("Test for get Food", async () => {
    const foodData = await Food.findOne({ _id: "62e7c9a654c2dac423acb3e4" });
    expect(foodData.ok);
  });
});

describe("Test for Food Schema", () => {
  // the code below is for insert testing
  it("Test for get Food", async () => {
    const foodData = await Food.find({});
    expect(foodData.ok);
  });
});

// describe("Test for Food Schema", () => {
//   // the code below is for insert testing
//   it("Test for delete Food", async () => {
//     const foodData = await Food.findByIdAndDelete("62e7c9a654c2dac423acb3e4");
//     expect(foodData.ok);
//   });
// });
