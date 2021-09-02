const express = require("express");
const OrderRouter = express();
const OrderModel = require("../models/order");
const Product = require("../models/product");
const { orderValidations } = require("../validation/order");
const verify = require("../middlewares/verify_token");
const jwt_decode = require("jwt-decode");

OrderRouter.post("/", verify, async (req, res) => {
  const { error } = orderValidations(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  let items = req.body.items;
  let order = new OrderModel({
    email: req.email,
    total: req.body.total,
    items: items,
    payment_type: req.body.payment_type,
  });
  try {
    items.forEach(async (element) => {
      let product = await Product.findById({ _id: element.item_id });
      product.qty = product.qty - element.qty;
      product = await product.save();
    });
    const newOrder = await order.save();
    res.status(200).send(newOrder);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

OrderRouter.get("/:orderId", async (req, res) => {
  try {
    let order = await OrderModel.findById(req.params.orderId);

    if (order) {
      res.status(200).send(order);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

OrderRouter.get("/", async (req, res) => {
  try {
    let orders = await OrderModel.find();
    res.status(200).send(orders);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

OrderRouter.delete("/:orderId", async (req, res) => {
  try {
    let deletedOrder = await OrderModel.findByIdAndDelete(req.params.orderId);
    res.status(200).send(deletedOrder);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = OrderRouter;
