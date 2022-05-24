import mongoose from "mongoose";

const homePageSchema = mongoose.Schema({
    selectedFile: { type: String },
    title: { type: String },
    detail: {
        type: String
    },
    details: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const HomePage = mongoose.model('HomePage', homePageSchema);

export default HomePage;