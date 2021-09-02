const express = require("express");
const contactRouter = express.Router();
const contactModel = require("../models/contact");
const { contactValidation } = require("../validation/contact");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// CREATE NEW CONTACT
contactRouter.post("/", async (req, res) => {
   // Validate the Add Users
   const { error } = contactValidation(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   // ADD new CONTACT
   const contact = new contactModel({
      fullName: req.body.fullName,
      email: req.body.email,
      message: req.body.message,
      isActive: false,
   });

   try {
      const savedContact = await contact.save();
      const msg = {
         to: req.body.email, // Change to your recipient
         from: "zshtmad@gmail.com", // Change to your verified sender
         subject: "Welcome Fury Cake Store",
         templateId: "d-76f401721cfb45229a80cfe595aae869",
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
      res.status(200).json({
         message: "SuccessFully Send Contact",
      });
   } catch (error) {
      res.json({ message: error });
   }
});
module.exports = contactRouter;
