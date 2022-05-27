import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import User from "../models/user.js";

export const deleteUsers = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await User.findByIdAndRemove(id);
    res.json({ msg: 'Users Deleted' });
}
export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // finding exisiting old user
        const existingUser = await User.findOne({ email });

        if (!existingUser)
            return res.status(404).json({ message: 'User not found' });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(404).json({ message: 'Password Incorrect' });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT, { expiresIn: '1d' });

        res.status(200).json({ result: existingUser, token, message: "Signin Successful" });

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const signup = async (req, res) => {
    // adding user to the database
    const { email, password, firstName, number, lastName, role, selectedFile, confirmPassword, address } = req.body;
    try {
        let existingUser = await User.findOne({ email });
        // if user is already exist
        if (existingUser) return res.status(404).json({ message: 'User already exist' });

        if (firstName.length < 3 || firstName.length > 10) return res.status(404).json({ message: 'Firstname required 3 to 10 char' });

        if (lastName.length < 3 || lastName.length > 10) return res.status(404).json({ message: 'Lastname required 3 to 10 char' });

        if (password.length < 8 || password.length > 15) return res.status(404).json({ message: 'Password required 8 to 15 char' });

        if (password !== confirmPassword) return res.status(404).json({ message: 'Password dont match' })
        // phone number validation
        if (number.length < 10 || number.length > 10) return res.status(404).json({ message: 'Phone number must be 10 digits' });
        // address validation
        if (address.length < 3 || address.length > 20) return res.status(404).json({ message: 'Address required 3 to 20 char' });
        // selectedFile validation
        if (selectedFile === null) return res.status(404).json({ message: 'Profile Pic is Required' });

        const hashPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashPassword, number, name: `${firstName} ${lastName}`, role, selectedFile, number, address });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT, { expiresIn: '1d' });
        res.status(200).json({ result, token, message: "Account Created Successfully" });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
};

export const singleUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) return res.status(404).json({ message: 'User not found' });
        const singleUser = await User.findById(id);
        res.status(200).json({ singleUser, message: "Profile Page" });
    } catch (error) {
        res.json({ message: error });
    }
};

export const updateSingleUser = async (req, res) => {
    const { id } = req.params;
    const { email, firstName, number, lastName, role, selectedFile, address } = req.body;
    try {
        const existingUser = await User.findById(id);
        if (!existingUser) return res.status(404).json({ message: 'User not found' });
        if (firstName.length < 3 || firstName.length > 10) return res.status(404).json({ message: 'Firstname required 3 to 10 char' });

        if (lastName.length < 3 || lastName.length > 10) return res.status(404).json({ message: 'Lastname required 3 to 10 char' });
        // phone number validation
        if (number.length < 10 || number.length > 10) return res.status(404).json({ message: 'Phone number must be 10 digits' });
        // address validation
        if (address.length < 3 || address.length > 20) return res.status(404).json({ message: 'Address required 3 to 20 char' });
        // selectedFile validation
        if (selectedFile === null) return res.status(404).json({ message: 'SelectedFile is Required' });

        const result = await User.findByIdAndUpdate(id, { email, number, name: `${firstName} ${lastName}`, role, selectedFile, number, address }, { new: true });
        res.status(200).json({ result, message: "User Updated" });

    } catch (error) {
        res.json({ message: error });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) return res.status(404).json({ message: 'User not found' });
        const result = await User.findByIdAndRemove(id);
        res.status(200).json({ result, message: "User Deleted" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}