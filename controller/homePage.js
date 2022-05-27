import HomePage from "../models/homePage.js";

export const getHomePage = async (req, res) => {
  try {
    const homePage = await HomePage.find();
    res.status(200).json({ homePage, message: "Welcome" });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const createHomePage = async (req, res) => {
  const { title, detail, selectedFile, description } = req.body;
  try {
    if (!title || !detail) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }
    if (!description) {
      return res.status(400).json({
        message: "Please provide description",
      });
    }
    if (!selectedFile) {
      return res.status(400).json({
        message: "Please provide a file",
      });
    }
    const homePage = new HomePage({ title, detail, selectedFile, description });
    const savedHomePage = await homePage.save();
    res
      .status(200)
      .json({ savedHomePage, message: "HomePage created successfully" });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
