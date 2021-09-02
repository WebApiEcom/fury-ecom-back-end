const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema(
   {
      fullName: {
         type: String,
         require: true,
      },
      email: {
         type: String,
         require: true,
      },
      message: {
         type: String,
         require: true,
      },
      isActive: {
         type: Boolean,
         require: true,
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("contact", ContactSchema);
