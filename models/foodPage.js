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
    category: {
        type: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const foodPage = mongoose.model('foodPage', foodPageSchema);

export default foodPage;