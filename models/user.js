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
    cart: {
        type: Array,
        default: []
    }
},
    {
        timestamps: true
    });

const userDetail = mongoose.model('UserDetails', userSchema);

export default userDetail;