const mongoose = require("mongoose");

const homePageSchema = mongoose.Schema(
  {
    selectedFile: { type: String },
    title: { type: String },
    detail: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const HomePage = mongoose.model("HomePage", homePageSchema);

module.exports = HomePage;
