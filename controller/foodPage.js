import foodPage from "../models/foodpage.js";

export const getFoodPage = async (req, res) => {
    try {
        const foodPageData = await foodPage.find();
        res.status(200).json({ foodPageData, message: "Welcome" });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const createFoodPage = async (req, res) => {
    const { title, description, selectedFile, price, tags, quantity, category } = req.body;
    try {
        if (!title || !description) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        };
        if (!selectedFile) {
            return res.status(400).json({
                message: "Please provide a file"
            });
        }
        if (!price) {
            return res.status(400).json({
                message: "Please provide a price"
            });
        }
        if (!tags) {
            return res.status(400).json({
                message: "Please provide a tags"
            });
        }
        if (!quantity) {
            return res.status(400).json({
                message: "Please provide a quantity"
            });
        }
        if (!category) {
            return res.status(400).json({
                message: "Please provide a category"
            });
        }
        const foodPageData = new foodPage({ title, description, selectedFile, price, tags, quantity, category });
        const savedFoodPage = await foodPageData.save();
        res.status(200).json({ savedFoodPage, message: "Food item created successfully" });
    } catch (error) {
        res.json({
            message: error.message
        });
    }
}