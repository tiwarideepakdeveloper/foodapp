import Joi from "joi";

export const updateSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'string.empty': 'FIRSTNAME_IS_REQUIRED',
    }),
    lastName: Joi.string().required().messages({
        'string.empty': 'LASTNAME_IS_REQUIRED',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'PLEASE_PROVIDE_A_VALID_EMAIL',
        'string.empty': 'EMAIL_IS_REQUIRED'
    }),
    password: Joi.string().min(6).messages({
        'string.min': 'PASSWORD_MUST_BE_6_CHARACTER_LONG',
    }),
    role_id: Joi.string().required().messages({
        'string.empty': 'ROLE_IS_REQUIRED'
    }),
    isActive: Joi.bool().required().messages({
        'string.empty': 'USER_ACTIVE_IS_REQUIRED'
    })
});

export const createSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'string.empty': 'FIRSTNAME_IS_REQUIRED',
    }),
    lastName: Joi.string().required().messages({
        'string.empty': 'LASTNAME_IS_REQUIRED',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'PLEASE_PROVIDE_A_VALID_EMAIL',
        'string.empty': 'EMAIL_IS_REQUIRED'
    }),
    role_id: Joi.string().required().messages({
        'string.empty': 'ROLE_IS_REQUIRED'
    }),
    password: Joi.string().required().min(6).messages({
        'string.min': 'PASSWORD_MUST_BE_6_CHARACTER_LONG',
        'string.empty': 'PASSWORD_IS_REQUIRED'
    }),
    isActive: Joi.bool().required().messages({
        'string.empty': 'USER_ACTIVE_IS_REQUIRED'
    })
});