import foodPage from "../models/foodpage.js";

export const getFoodPage = async (req, res) => {
    const { page, limit, sort } = req.query;
    try {
        const PAGE = page || 1;
        const LIMIT = limit || 4;
        const SKIP = (Number(PAGE) - 1) * LIMIT; // get the starting index of every page
        const SORT = sort || 'createdAt';
        const TotalPages = await foodPage.countDocuments({});
        const foodPageData = await foodPage.find().sort(SORT).limit(LIMIT).skip(SKIP);
        res.json({ foodPageData, currentPage: Number(PAGE), totalFoodPage: Math.ceil(TotalPages / LIMIT) });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error });
    }
};

export const getFoodBySearch = async (req, res) => {
    const { searchFood, tags } = req.query;
    try {
        const title = new RegExp(searchFood, 'i');
        // const tag = new RegExp(tags, 'i');
        // const foodSearchData = await foodPage.find({ $or: [{ title }, { tags: { $in: tag.split(',') } }] });
        const foodSearchData = await foodPage.find({ $or: [{ title }] });
        res.json({ foodSearchData, message: foodSearchData.length + " food found for " + '"' + searchFood + '"' });
    } catch (error) {
        res.status(404).json({ message: error.message });
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
