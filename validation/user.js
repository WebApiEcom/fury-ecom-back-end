const Joi = require("joi");

const registrationUserValidation = (data) => {
   const nestedSchema = Joi.object().keys({
      address_No: Joi.string().min(1).required().messages({
         "string.empty": `Address No cannot be an empty field`,
         "string.min": `Address No should have a minimum length of {#limit}`,
         "any.required": `Address No is a required field`,
         "string.base": "Address No must be a string",
      }),
      lane: Joi.string().min(1).required().messages({
         "string.empty": `Lane No cannot be an empty field`,
         "string.min": `Lane No should have a minimum length of {#limit}`,
         "any.required": `Lane No is a required field`,
         "string.base": "Lane No must be a string",
      }),
      city: Joi.string().min(1).required().messages({
         "string.empty": `City cannot be an empty field`,
         "string.min": `City should have a minimum length of {#limit}`,
         "any.required": `City is a required field`,
         "string.base": "City must be a string",
      }),
   });

   const userSchema = Joi.object({
      name: Joi.string().min(4).required().messages({
         "string.empty": `Name cannot be an empty field`,
         "string.min": `Name should have a minimum length of {#limit}`,
         "any.required": `Name is a required field`,
         "string.base": "Name must be a string",
      }),
      email: Joi.string().required().email().messages({
         "string.empty": `Email cannot be an empty field`,
         "any.required": `Email is a required field`,
         "string.email": "Email must be a valid email",
      }),
      phone_number: Joi.string()
         .length(10)
         .pattern(/^[0-9]+$/)
         .messages({
            "string.empty": `Phone Number cannot be an empty field`,
            "any.required": `Phone Number is a required field`,
            "string.length":
               "Phone Number length must be {{#limit}} characters long",
            "string.pattern.base":
               "Phone Number should be 10 numbers and Valid Number",
            "string.pattern.name":
               "Phone Number should be 10 numbers and Valid Number",
            "string.pattern.invert.base":
               "Phone Number should be 10 numbers and Valid Number",
            "string.pattern.invert.name":
               "Phone Number with value {:[.]} matches the inverted {{#name}} pattern",
         }),
      address: nestedSchema,
      userType: Joi.string().required().messages({
         "string.empty": `Email cannot be an empty field`,
         "any.required": `Email is a required field`,
         "string.base": "Email must be a string",
      }),
      password: Joi.string().min(6).required().messages({
         "string.empty": `Password cannot be an empty field`,
         "any.required": `Password is a required field`,
         "string.base": "Password must be a string",
         "string.min": `Password should have a minimum length of {#limit}`,
      }),
   });

   return userSchema.validate(data);
};
const loginValidation = (data) => {
   const userSchema = Joi.object({
      email: Joi.string().required().email().messages({
         "string.empty": `Email cannot be an empty field`,
         "any.required": `Email is a required field`,
         "string.email": "Email must be a valid email",
      }),
      password: Joi.string().required().messages({
         "string.empty": `Password cannot be an empty field`,
         "any.required": `Password is a required field`,
      }),
   });

   return userSchema.validate(data);
};

const updateUserValidation = (data) => {
   const nestedSchema = Joi.object().keys({
      address_No: Joi.string().min(1).required().messages({
         "string.empty": `Address No cannot be an empty field`,
         "string.min": `Address No should have a minimum length of {#limit}`,
         "any.required": `Address No is a required field`,
         "string.base": "Address No must be a string",
      }),
      lane: Joi.string().min(1).required().messages({
         "string.empty": `lane No cannot be an empty field`,
         "string.min": `lane No should have a minimum length of {#limit}`,
         "any.required": `lane No is a required field`,
         "string.base": "lane No must be a string",
      }),
      city: Joi.string().min(1).required().messages({
         "string.empty": `City cannot be an empty field`,
         "string.min": `City should have a minimum length of {#limit}`,
         "any.required": `City is a required field`,
         "string.base": "City must be a string",
      }),
   });

   const userSchema = Joi.object({
      name: Joi.string().min(4).required().messages({
         "string.empty": `Name cannot be an empty field`,
         "string.min": `Name should have a minimum length of {#limit}`,
         "any.required": `Name is a required field`,
         "string.base": "Name must be a string",
      }),
      phone_number: Joi.string()
         .length(10)
         .pattern(/^[0-9]+$/)
         .messages({
            "string.empty": `Phone Number cannot be an empty field`,
            "any.required": `Phone Number is a required field`,
            "string.length":
               "Phone Number length must be {{#limit}} characters long",
            "string.pattern.base":
               "Phone Number should be 10 numbers and Valid Number",
            "string.pattern.name":
               "Phone Number should be 10 numbers and Valid Number",
            "string.pattern.invert.base":
               "Phone Number should be 10 numbers and Valid Number",
            "string.pattern.invert.name":
               "Phone Number with value {:[.]} matches the inverted {{#name}} pattern",
         }),
      address: nestedSchema
   });

   return userSchema.validate(data);
};
module.exports.registrationUserValidation = registrationUserValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateUserValidation = updateUserValidation;
