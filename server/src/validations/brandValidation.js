import Joi from "joi";

export const updateSchema = Joi.object({
    identifier: Joi.string().required().messages({
        'string.empty': 'IDENTIFIERED_IS_REQUIRED',
    }),
    slug: Joi.string().required().messages({
        'string.empty': 'SLUG_IS_REQUIRED',
    }),
    isActive: Joi.bool().required().messages({
        'string.empty': 'BRAND_ACTIVE_IS_REQUIRED'
    })
});

export const createSchema = Joi.object({
    identifier: Joi.string().required().messages({
        'string.empty': 'IDENTIFIERED_IS_REQUIRED',
    }),
    slug: Joi.string().required().messages({
        'string.empty': 'SLUG_IS_REQUIRED',
    }),
    isActive: Joi.bool().required().messages({
        'string.empty': 'BRAND_ACTIVE_IS_REQUIRED'
    })
});