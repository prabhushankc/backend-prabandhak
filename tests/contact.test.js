const Contact = require("../models/contactModel");
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

describe("Test for Creating Contact", () => {
  it("Test for Create Contact", async () => {
    const createContact = {
      user: userOneId,
      firstName: "Anup",
      lastName: "Lamsal",
      email: "anup@gmail.com",
      comment: "This is a sample comment from anup",
    };
    return Contact.create(createContact).then(res => {
      expect(res.email).toEqual("anup@gmail.com");
    });
  });
});

describe("Test for Contact Schema", () => {
  // the code below is for insert testing
  it("Test for get Contact", async () => {
    const contact = await Contact.findOne({ _id: "62e7f2d0e01c599b1c64ffb4" });
    expect(contact.ok);
  });
});

describe("Test for Contact Schema", () => {
  // the code below is for insert testing
  it("Test for get Contact", async () => {
    const contact = await Contact.find({});
    expect(contact.ok);
  });
});

describe("Test for Contact Schema", () => {
  // the code below is for insert testing
  it("Test for delete Contact", async () => {
    const contact = await Contact.findByIdAndDelete("62e7f2d0e01c599b1c64ffb4");
    expect(contact.ok);
  });
});
