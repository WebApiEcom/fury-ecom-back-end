const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/user");
const bencrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const {
   registrationUserValidation,
   loginValidation,
   updateUserValidation,
} = require("../validation/user");

// CREATE NEW USER
userRouter.post("/", async (req, res) => {
   // Validate the Add Users
   const { error } = registrationUserValidation(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   // check email exists
   const emailExists = await userModel.findOne({ email: req.body.email });

   // get email already error message
   if (emailExists) return res.status(400).send("Email Already Exists");

   // Hash Password
   //   const salt = await bencrypt.genSalt(10);
   // const hashPassword = await bencrypt.hash(req.body.password, salt);

   // Regsiter new user
   const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      address: req.body.address,
      userType: req.body.userType,
      // password: hashPassword,
   });

   try {
      const savedUser = await user.save();

      const msg = {
         to: req.body.email, // Sender Email
         from: "zshtmad@gmail.com", // Your Email
         subject: "Welcome Fury Shopping",
         templateId: "d-79977ac64d28481ea2a565d9de6267c1",
      };

      sgMail
         .send(msg)
         .then((response) => {
            console.log(response[0].statusCode);
            console.log(response[0].headers);
         })
         .catch((error) => {
            console.error(error);
         });

      // Set Token
      const token = jwt.sign(
         { email: savedUser.email },
         process.env.TOKEN_SECRET
      );
      // // Add to Header
      res.header("x-authToken", token);
      res.status(200).json({
         message: "SuccessFully Registered",
         token,
      });
   } catch (error) {
      res.json({ message: error });
   }
});

// SHOW ALL USERS
userRouter.get("/", async (req, res) => {
   try {
      let users = await userModel.find();
      res.send(users);
   } catch (error) {
      return res.status(500).send("error", error.message);
   }
});

// CHECKING BY THE EMAIL USER IS EXIST OR NOT, IF EXIST SEND THE USER'S TOKEN, IF NOT SEND A MESSAGE USER IS NOT EXIST ( THIS API CALL IS HAPPEN IN CART PAGE IN ONPLACE ORDER FUNCTION)
userRouter.get("/:email", async (req, res) => {
   // const emailDecode = jwt_decode(req.params.email);
   try {
      let user = await userModel.findOne({ email: req.params.email });

      if (!user) {
         result = {
            message: "No user avalable",
            isUser: false,
         };
         return res.status(200).send(result);
      } else {
         // Set Token
         const token = jwt.sign(
            { email: req.params.email },
            process.env.TOKEN_SECRET
         );

         result = {
            message: "User is avalable",
            isUser: true,
            user: user,
            token: token,
         };
         res.status(200).send(result);
      }
   } catch (error) {
      return res.status(500).send(error.message);
   }
   // const emailDecode = jwt_decode(req.params.email);
   // try {
   //   let user = await userModel.findOne({ email: emailDecode.email });
   //   res.send(user);
   // } catch (error) {
   //   return res.status(500).send("error", error.message);
   // }
});

// VERIFYING REDUX SAVED USER TOKEN IS VALID OR NOT WHEN RENDER THE CHECKOUT PAGE
userRouter.get("/verify/:email", async (req, res) => {
   const emailDecode = jwt_decode(req.params.email);
   try {
      let user = await userModel.findOne({ email: emailDecode.email });
      res.send(user);
   } catch (error) {
      return res.status(500).send("error", error.message);
   }
});

// LOGIN ALL USERS
userRouter.post("/login", async (req, res) => {
   // Validate the Login Users
   const { error } = loginValidation(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const userExists = await userModel.findOne({ email: req.body.email });

   if (!userExists) return res.status(400).send("Invalid Email or Password");

   const passCheck = await bencrypt.compare(
      req.body.password,
      userExists.password
   );
   if (!passCheck) return res.status(400).send("Invalid password");

   // Set Token
   const token = jwt.sign(
      { email: userExists.email },
      process.env.TOKEN_SECRET
   );

   // // Add to Header
   res.header("auth-token", token);
   res.status(200).json({
      message: "SuccessFully Logged In",
      token,
   });
});

userRouter.put("/:userId", async (req, res) => {
   const { error } = updateUserValidation(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   try {
      let user = await userModel.findById(req.params.userId);
      if (!user) {
         res.status(404).json({
            message: "User Cannot found! please check the Id",
         });
      } else {
         let str1 = "0";
         let str2 = user.phone_number;
         let i = 0;
         if (user.name != req.body.name) {
            user.name = req.body.name;
            i++;
         }
         if (str1.concat(str2) != req.body.phone_number) {
            user.phone_number = req.body.phone_number;
            i++;
         }
         if (JSON.stringify(user.address) != JSON.stringify(req.body.address)) {
            user.address = req.body.address;
            i++;
         }

         if (i > 0) {
            let updatedUser = await user.save();
            res.status(200).json({ message: "Successfully Updated!" });
            console.log(nDate);
         }
      }
   } catch (e) {
      res.status(400).send(e.message);
   }
});

// DELETE SPECIFIC USERS
userRouter.delete("/:userId", async (req, res) => {
   let userId = await userModel.findById(req.params.userId);
   if (!userId) {
      return res.status(404).send("Enter Invalid User ID");
   }
   try {
      const deleteUser = await userModel.deleteOne({ _id: userId });
      res.status(200).json(deleteUser);
   } catch (error) {
      res.json(error);
   }
});

module.exports = userRouter;
