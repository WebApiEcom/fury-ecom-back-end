const Joi = require("joi");

const orderValidations = (data) => {

    let item = Joi.object({
        item_id: Joi.string().required().messages({
            "string.empty": `At least 1 item should be selected!`,
            "any.required": `At least 1 item should be selected!`,
        }),
        item_name: Joi.string().required().messages({
            "string.base": `Product name should be a type of 'text'`,
            "string.empty": `Product name can't be empty!`,
            "any.required": `Product name is a required field`,
        }),
        price: Joi.number().strict(true).required().messages({
            "number.base": `Price should be a type of 'number'`,
            "number.empty": `Price can't be empty!`,
            "any.required": `Price is a required field`,
        }),
        qty: Joi.number().greater(0).required().messages({
            "number.base": `Quantity should be a type of 'number'`,
            "number.empty": `Quantity can't be empty!`,
            "any.required": `Quantity is a required field`,
        }),
        amount: Joi.number().greater(0).required().messages({
            "number.base": `Amount should be a type of 'number'`,
            "number.empty": `Amount can't be empty!`,
            "any.required": `Amount is a required field`,
        }),
        img_url: Joi.string().required()
    });
    const orderSchema = Joi.object({
        total: Joi.number().strict(true).required().messages({
            "number.base": `Total should be a type of 'number'`,
            "number.empty": `Total can't be empty!`,
            "any.required": `Total is a required field`,
        }),
        items: Joi.array().items(item),
        payment_type: Joi.string().required().messages({
            "string.base": `Payment type should be a type of 'text'`,
            "string.empty": `Payment type can't be empty!`,
            "any.required": `Please select a payment method`,
        })
    });

    return orderSchema.validate(data);
};

module.exports.orderValidations = orderValidations;