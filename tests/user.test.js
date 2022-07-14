const User = require("../models/user");
const mongoose = require("mongoose");
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

describe("Test for Creating User", () => {
  it("Test for Create User", async () => {
    const createUser = {
      name: "Dilip",
      email: "zanzerdawadi123@gmail.com",
      password: "12345678",
      selectedFile:
        "https://firebasestorage.googleapis.com/v0/b/hms-agile.appspot.com/o/images%2Fabc.jpeg?alt=media&token=a0ae3cc2-dc01-48e8-8b6b-5e9292069df7",
      number: "9845222445",
      address: "Bharatpur",
    };
    return User.create(createUser).then(res => {
      expect(res.number).toEqual("9845222445");
    });
  });
});

describe("Test for Login User", () => {
  it("Test for Sign in User", async () => {
    const createUser = {
      email: "zanzerdawadi123@gmail.com",
      password: "12345678",
    };
    return User.findOne({ email: createUser.email }).then(res => {
      expect(res.email).toEqual(createUser.email);
    });
  });
});
