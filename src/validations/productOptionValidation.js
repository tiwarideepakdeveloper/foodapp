import Joi from "joi";

export const productOptionSchema = Joi.object({
    identifier: Joi.string().required().messages({
        'string.empty': 'IDENTIFIERED_IS_REQUIRED',
    }),
    sortOrder: Joi.number().integer().required().messages({
        'number.empty': 'SORT_ORDER_IS_REQUIRED',
    }),
    isActive: Joi.bool().required().messages({
        'string.empty': 'ACTIVE_IS_REQUIRED'
    })
});