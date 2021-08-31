const express = require("express");
const Product = require("../models/product");
const router = express.Router();
const { productValidation } = require("../validation/product");
const mongoose = require("mongoose");

// GET ALL PRODUCTS
router.get("/products", async (req, res) => {
  try {
    // RETRIVE ALL PRODUCTS
    let products = await Product.find();

    // SEND RESPONSE TO CLIENT
    res.status(200).send(products);
  } catch (ex) {
    // IF CATCH ANY ERROR DURING THE PROCESS
    return res.status(500).send("Error", ex.message);
  }
});

// CREATE A PRODUCT
router.post("/products", async (req, res) => {
  try {
    console.log("print", req.body);
    // VALIDATE THE REQ.BODY DATA
    const { error } = productValidation(req.body);

    // PASS ERROR MESSAGE IF CATCH ANY ERROR
    if (error) return res.status(400).send(error.details[0].message);

    // CREATE NEW PRODUCT
    let product = new Product({
      name: req.body.name,
      prices: req.body.prices,
      qty: req.body.qty,
      imgUrl: req.body.imgUrl,
      category: req.body.category,
      isActive: req.body.isActive,
      description: req.body.description,
      weight: req.body.weight,
    });

    // INSERT TO DATABASE
    product = await product.save();

    // DEFINE RESPONSE
    const success = {
      product: product,
      message: "Successfully created a product!",
    };

    // SEND RESPONSE TO CLIENT
    res.status(200).send(success);
  } catch (ex) {
    // IF CATCH ANY ERROR DURING THE PROCESS
    return res.status(500).send("Error", ex.message);
  }
});

//GET WITH PARAMS
router.get("/products/:productId", async (req, res) => {
  try {
    //CHECK ID IS INVALID OR NOT
    if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
      return res.status(400).send("Given id is invalid");
    }

    //RETRIEVE PRODUCT BY GIVEN ID
    let product = await Product.findOne({ _id: req.params.productId });

    //CHECK GIVEN ID IS EXIT OR NOT
    if (!product) {
      return res.status(400).send("Given id does not exist");
    }

    // SEND RESPONSE TO CLIENT
    res.status(200).send(product);
  } catch (ex) {
    // IF CATCH ANY ERROR DURING THE PROCESS
    return res.status(500).send("Error", ex.message);
  }
});

//UPDATE A PRODUCT
router.put("/products/:productId", async (req, res) => {
  try {
    // VALIDATE THE REQ.BODY DATA
    const { error } = productValidation(req.body);

    // PASS ERROR MESSAGE IF CATCH ANY ERROR
    if (error) return res.status(400).send(error.details[0].message);

    //CHECK ID IS INVALID OR NOT
    if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
      return res.status(400).send("Given id is invalid");
    }

    //RETRIEVE PRODUCT BY GIVEN ID
    let product = await Product.findById({ _id: req.params.productId });

    //CHECK GIVEN ID IS EXIT OR NOT
    if (!product) {
      return res.status(400).send("Given id does not exist");
    }

    //UPDATE
    product.name = req.body.name;
    product.prices = req.body.prices;
    product.qty = req.body.qty;
    product.imgUrl = req.body.imgUrl;
    product.category = req.body.category;
    product.isActive = req.body.isActive;
    product.description = req.body.description;
    product.weight = req.body.weight;

    // INSERT TO DATABASE
    product = await product.save();

    // DEFINE RESPONSE
    const success = {
      product: product,
      message: "Successfully updated a product!",
    };

    // SEND RESPONSE TO CLIENT
    res.status(200).send(success);
  } catch (ex) {
    // IF CATCH ANY ERROR DURING THE PROCESS
    return res.status(500).send("Error", ex.message);
  }
});

//DELETE PRODUCT
router.delete("/products/:productId", async (req, res) => {
  try {
    //CHECK ID IS INVALID OR NOT
    if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
      return res.status(400).send("Given id is invalid");
    }

    //RETRIEVE PRODUCT BY GIVEN ID
    let product = await Product.findOneAndDelete({ _id: req.params.productId });

    //CHECK GIVEN ID IS EXIT OR NOT
    if (!product) {
      return res.status(404).send("The given id does not exist");
    }

    // SEND RESPONSE TO CLIENT
    res.status(200).send("successfully deleted!");
  } catch (ex) {
    // IF CATCH ANY ERROR DURING THE PROCESS
    return res.status(500).send("Error", ex.message);
  }
});

module.exports = router;
