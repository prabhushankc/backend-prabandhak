import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.js";

export const deleteUsers = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  await User.findByIdAndRemove(id);
  res.json({ msg: "Users Deleted" });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // finding exisiting old user
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({
        message: "User not found " + Math.floor(Math.random() * 10 + 1),
      });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(404).json({
        message: "Password Incorrect " + Math.floor(Math.random() * 10 + 1),
      });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT,
      { expiresIn: "30d" }
    );

    res
      .status(200)
      .json({ result: existingUser, token, msg: "Signin Successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const signup = async (req, res) => {
  // adding user to the database
  const {
    email,
    password,
    firstName,
    number,
    lastName,
    role,
    selectedFile,
    confirmPassword,
    address,
  } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    // if user is already exist
    if (existingUser)
      return res.status(404).json({
        message: "User already exist " + Math.floor(Math.random() * 10 + 1),
      });

    if (firstName.length < 3 || firstName.length > 10)
      return res.status(404).json({
        message:
          "Firstname must be between 3 and 10 characters " +
          Math.floor(Math.random() * 10 + 1),
      });

    if (lastName.length < 3 || lastName.length > 10)
      return res.status(404).json({
        message:
          "Lastname must be between 3 and 10 characters " +
          Math.floor(Math.random() * 10 + 1),
      });

    if (password.length < 8 || password.length > 15)
      return res.status(404).json({
        message:
          "Password must be between 8 to 15 char with a number and a special char  " +
          Math.floor(Math.random() * 10 + 1),
      });

    if (password !== confirmPassword)
      return res.status(404).json({
        message: "Password dont match " + Math.floor(Math.random() * 10 + 1),
      });
    // phone number validation
    if (number.length < 10 || number.length > 10)
      return res.status(404).json({
        message:
          "Phone number must be 10 digits " +
          Math.floor(Math.random() * 10 + 1),
      });
    // address validation
    if (address.length < 3 || address.length > 10)
      return res.status(404).json({
        message:
          "Address must be between 3 and 10 characters " +
          Math.floor(Math.random() * 10 + 1),
      });
    // selectedFile validation
    if (selectedFile === null)
      return res.status(404).json({
        message:
          "SelectedFile is Required " + Math.floor(Math.random() * 10 + 1),
      });

    const hashPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashPassword,
      number,
      name: `${firstName} ${lastName}`,
      role,
      selectedFile,
      number,
      address,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT,
      { expiresIn: "30d" }
    );
    res.status(200).json({
      result,
      token,
      message: "User Created " + Math.floor(Math.random() * 10 + 1),
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const singleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await User.findById(id);
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const updateSingleUser = async (req, res) => {
  const { id } = req.params;
  const { email, firstName, number, lastName, role, selectedFile, address } =
    req.body;
  try {
    const existingUser = await User.findById(id);
    if (!existingUser)
      return res.status(404).json({
        message: "User not found " + Math.floor(Math.random() * 10 + 1),
      });
    if (firstName.length < 3 || firstName.length > 10)
      return res.status(404).json({
        message:
          "Firstname must be between 3 and 10 characters " +
          Math.floor(Math.random() * 10 + 1),
      });

    if (lastName.length < 3 || lastName.length > 10)
      return res.status(404).json({
        message:
          "Lastname must be between 3 and 10 characters " +
          Math.floor(Math.random() * 10 + 1),
      });
    // phone number validation
    if (number.length < 10 || number.length > 10)
      return res.status(404).json({
        message:
          "Phone number must be 10 digits " +
          Math.floor(Math.random() * 10 + 1),
      });
    // address validation
    if (address.length < 3 || address.length > 10)
      return res.status(404).json({
        message:
          "Address must be between 3 and 10 characters " +
          Math.floor(Math.random() * 10 + 1),
      });
    // selectedFile validation
    if (selectedFile === null)
      return res.status(404).json({
        message:
          "SelectedFile is Required " + Math.floor(Math.random() * 10 + 1),
      });

    const result = await User.findByIdAndUpdate(
      id,
      {
        email,
        number,
        name: `${firstName} ${lastName}`,
        role,
        selectedFile,
        number,
        address,
      },
      { new: true }
    );
    res.status(200).json({
      result,
      message: "User Updated " + Math.floor(Math.random() * 10 + 1),
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No User with id: ${id}`);
  await User.findByIdAndRemove(id);
  res.json({ message: "Account Deleted" });
};
