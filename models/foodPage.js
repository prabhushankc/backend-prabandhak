import mongoose from "mongoose";

const foodPageSchema = mongoose.Schema({
    selectedFile: { type: String },
    title: { type: String },
    description: {
        type: String
    },
    price: {
        type: String
    },
    tags: {
        type: [String]
    },
    quantity: {
        type: String
    },
    sold: {
        type: Number,
        default: 0
    },
},
    {
        timestamps: true
    }
);

const foodPage = mongoose.model('foodPage', foodPageSchema);

export default foodPage;