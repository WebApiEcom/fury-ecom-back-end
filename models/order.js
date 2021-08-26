const { number } = require('joi');
const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    email: { type: String, require: true },
    total: { type: Number, require: true, min: [1, 'Total cannot be zero'] },
    items: [{
        item_id: { type: String, require: true },
        item_name: { type: String, require: true },
        qty: { type: Number, min: [1, 'Quantity cannot be zero'] },
        price: { type: Number, min: [1, 'Price cannot be zero'] },
        amount: { type: Number, require: true, min: [1, 'Amount cannot be zero'] },
        img_url: { type: String, require: true }
    }],
    payment_type: { type: String, require: true }
},
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);