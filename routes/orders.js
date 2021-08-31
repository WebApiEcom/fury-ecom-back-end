const express = require("express");
const OrderRouter = express();
const OrderModel = require("../models/order");
const { orderValidations } = require("../validation/order");
const verify = require("../middlewares/verify_token");
const jwt_decode = require("jwt-decode");

OrderRouter.post("/", verify, async (req, res) => {
  const { error } = orderValidations(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // add Decode
  const emailDecode = jwt_decode(req.header("x-authToken"));

  let order = new OrderModel({
    email: emailDecode.email,
    total: req.body.total,
    items: req.body.items,
    payment_type: req.body.payment_type,
  });
  try {
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

/*OrderRouter.put("/:order_id", async (req, res) => {
   const { error } = orderValidations(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   try {
      let order = await OrderModel.findById(req.params.order_id);
      if (order) {
         if (req.body.total) {
            order.total = req.body.total;
         }
         if (req.body.items) {
            let items = [];
            for (var key in req.body.items) {
               if (req.body.items.hasOwnProperty(key)) {
                  let value = req.body.items[key];
                  items.push({
                     item_id: value.item_id,
                     item_name: value.item_name,
                     price: value.price,
                     qty: value.qty,
                     amount: value.amount,
                     img_url: value.img_url
                  });
               }
            }

            order.items = items;
         }
         if (req.body.payment_type) {
            order.payment_type = req.body.payment_type;
         }
         try {
            let updated_order = await order.save();
            res.status(200).send(updated_order);
         } catch (e) {
            res.status(500).send(e.message);
         }
      }
   } catch (e) { }
});*/

OrderRouter.delete("/:orderId", async (req, res) => {
  try {
    let deletedOrder = await OrderModel.findByIdAndDelete(req.params.orderId);
    res.status(200).send(deletedOrder);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = OrderRouter;
