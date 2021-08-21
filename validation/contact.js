const Joi = require("joi");

const contactValidation = (data) => {
   const ContactSchema = Joi.object({
      fullName: Joi.string().required().messages({
         "string.base": `name should be a type of 'text'`,
         "string.empty": `name can't be empty!`,
         "any.required": `name is a required field`,
      }),
      email: Joi.string().required().email().messages({
         "string.empty": `Email cannot be an empty field`,
         "any.required": `Email is a required field`,
         "string.email": "Email must be a valid email",
      }),
      message: Joi.string().required().messages({
         "string.empty": `message name can't be empty!`,
         "any.required": `message name is a required field`,
      }),
   });
   return ContactSchema.validate(data);
};
module.exports.contactValidation = contactValidation;
