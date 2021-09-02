const mongoose = require("mongoose");

const price_field = mongoose.Schema(
  {
    price: {
      type: Number,
      require: true,
    },
    discount: {
      type: Number,
      require: true,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: String,
    prices: price_field,
    qty: Number,
    imgUrl: String,
    category: String,
    isActive: Boolean,
    description: String,
    weight: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
