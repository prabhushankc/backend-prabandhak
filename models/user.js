import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String, required: true,
    },
    email: {
        type: String, required: true, unique: true,
    },
    password: {
        type: String, required: true,
    },
    selectedFile: { type: String },
    role: { type: Number, default: 0 },
    number: { type: String },
    address: { type: String },
});

const userDetail = mongoose.model('UserDetails', userSchema);

export default userDetail;