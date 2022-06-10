import paymentPage from '../models/paymentPage.js';
import Users from '../models/user.js';
import foodPage from '../models/foodpage.js';

export const getPayments = async (req, res) => {
    try {
        const payments = await paymentPage.find();
        // update status
        res.json({ payments, message: "Payments Page" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};
export const createPayment = async (req, res) => {
    try {
        const user = await Users.findById(req.userId).select('name email');
        if (!user) return res.status(400).json({ message: "User does not exist." })

        const { cart, paymentID, address } = req.body;

        const { _id, name, email } = user;

        const newPayment = new paymentPage({
            user_id: _id, name, email, cart, paymentID, address
        })

        cart.filter(item => {
            return sold(item._id, item.quantity, item.sold)
        })
        await Users.findByIdAndUpdate(_id, { cart: [] });
        await newPayment.save()
        res.json({ message: "Payment Succes!" })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};

const sold = async (id, quantity, oldSold) => {
    const availableQuantity = await foodPage.findById(id).select('quantity');
    const prevQuantity = availableQuantity.quantity;
    if (!quantity) return res.status(400).json({ message: "Quantity does not exist." })
    await foodPage.findOneAndUpdate({ _id: id }, {
        sold: quantity + oldSold,
        quantity: prevQuantity - quantity
    })
}