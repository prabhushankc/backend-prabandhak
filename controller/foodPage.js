import foodPage from "../models/foodpage.js";

export const getFoodPage = async (req, res) => {
    try {
        const foodPageData = await foodPage.find();
        res.status(200).json({ foodPageData, message: "Welcome to Prabandhak" });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const createFoodPage = async (req, res) => {
    const { title, description, selectedFile, price, tags, quantity } = req.body;
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
        const foodPageData = new foodPage({ title, description, selectedFile, price, tags, quantity });
        const savedFoodPage = await foodPageData.save();
        res.status(200).json({ savedFoodPage, message: "Food Item Created Successfully" });
    } catch (error) {
        res.json({
            message: error.message
        });
    }
}
export const updateFoodPage = async (req, res) => {
    const { id } = req.params;
    const { title, description, selectedFile, price, tags, quantity } = req.body;
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
        const foodPageUpdate = { title, description, selectedFile, price, tags, quantity };
        const updateFoodPage = await foodPage.findByIdAndUpdate(id, foodPageUpdate, { new: true });
        res.json({ updateFoodPage, message: "Food Item Updated Successfully" });
    } catch (error) {
        res.json({ message: error });
    }

}
export const deleteFood = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) return res.status(404).json({ message: 'Food not found' });
        const result = await foodPage.findByIdAndRemove(id);
        res.status(200).json({ result, message: "Food Deleted" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}
