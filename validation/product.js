const Joi = require("joi");

const productValidation = (data) => {
  const nestedPriceSchema = Joi.object().keys({
    price: Joi.number().required().greater(0).strict(true).messages({
      "number.base": `Price should be a type of 'number'`,
      "number.empty": `Price can't be empty!`,
      "any.required": `Price is a required field`,
    }),
    discount: Joi.number().required().greater(0).strict(true).messages({
      "number.base": `Discount should be a type of 'number'`,
      "number.empty": `Discount can't be empty!`,
      "any.required": `Discount is a required field`,
    }),
  });

  const productSchema = Joi.object({
    name: Joi.string().required().messages({
      "string.base": `Product name should be a type of 'text'`,
      "string.empty": `Product name can't be empty!`,
      "any.required": `Product name is a required field`,
    }),
    prices: nestedPriceSchema,
    qty: Joi.number().greater(0).required().messages({
      "number.base": `Quantity should be a type of 'number'`,
      "number.empty": `Quantity can't be empty!`,
      "any.required": `Quantity is a required field`,
    }),
    imgUrl: Joi.string().required().messages({
      "string.base": `Image URL should be a type of 'text'`,
      "string.empty": `Image URL can't be empty!`,
      "any.required": `Image URL is a required field`,
    }),
    category: Joi.string().required().messages({
      "string.base": `Category should be a type of 'text'`,
      "string.empty": `Category can't be empty!`,
      "any.required": `Category is a required field`,
    }),
    isActive: Joi.boolean().required().messages({
      "boolean.base": `Product status should be a type of 'boolean'`,
      "boolean.empty": `Product status cannot be an empty field`,
      "any.required": `Product status is a required field`,
    }),
    description: Joi.string().required().messages({
      "string.base": `Description should be a type of 'text'`,
      "string.empty": `Description can't be empty!`,
      "any.required": `Description is a required field`,
    }),
    weight: Joi.string().required().messages({
      "string.base": `Weight should be a type of 'text'`,
      "string.empty": `Weight can't be empty!`,
      "any.required": `Weight is a required field`,
    }),
  });

  return productSchema.validate(data);
};

module.exports.productValidation = productValidation;
