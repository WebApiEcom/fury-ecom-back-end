const express = require("express");
const Product = require("../models/product");
const mongoose = require("mongoose");
const router = express.Router();

// GET ALL PRODUCTS
router.get("/products", async (req, res) => {
  try {
    // RETRIVE ALL PRODUCTS
    let products = await Product.find();

    // SEND RESPONSE TO CLIENT
    res.status(200).send(products);
  } catch (ex) {
    // IF CATCH ANY ERROR DURING THE PROCESS
    return res.status(500).send(ex.message);
  }
});

// GET WITH PARAMS
router.get("/products/:productId", async (req, res) => {
  try {
    // CHECK ID IS INVALID OR NOT
    if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
      return res.status(400).send("Given id is invalid");
    }

    // RETRIEVE PRODUCT BY GIVEN ID
    let product = await Product.findOne({ _id: req.params.productId });

    // CHECK GIVEN ID IS EXIT OR NOT
    if (!product) {
      return res.status(400).send("Given id does not exist");
    }

    // SEND RESPONSE TO CLIENT
    res.status(200).send(product);
  } catch (ex) {
    // IF CATCH ANY ERROR DURING THE PROCESS
    return res.status(500).send(ex.message);
  }
});

module.exports = router;
