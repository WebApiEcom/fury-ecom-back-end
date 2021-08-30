const mongoose = require("mongoose");

const address_field = mongoose.Schema(
  {
    address_No: {
      type: String,
      require: true,
    },
    lane: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
  },
  { _id: false }
);

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone_number: {
      type: String,
      require: true,
    },
    address: address_field,
    userType: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      //  require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
