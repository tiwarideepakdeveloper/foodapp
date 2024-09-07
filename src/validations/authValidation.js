import Joi from "joi";

export const registerSchema = Joi.object({
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
    password: Joi.string().min(6).required().messages({
        'string.min': 'PASSWORD_MUST_BE_6_CHARACTER_LONG',
        'string.empty': 'PASSWORD_IS_REQUIRED'
    }),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')).messages({
        'any.only': 'Passwords do not match',
    }),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'PLEASE_PROVIDE_A_VALID_EMAIL',
        'string.empty': 'EMAIL_IS_REQUIRED',
    }),
    password: Joi.string().required().messages({
        'string.empty': 'PASSWORD_IS_REQUIRED',
    })
});

export const forgetPassSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'PLEASE_PROVIDE_A_VALID_EMAIL',
        'string.empty': 'EMAIL_IS_REQUIRED',
    })
});


export const verifyOtpSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'PLEASE_PROVIDE_A_VALID_EMAIL',
        'string.empty': 'EMAIL_IS_REQUIRED',
    }),
    otp: Joi.string().length(6).required().messages({
        'string.empty': 'OTP_IS_REQUIRED',
        'string.length': 'ENTER_VALID_OTP',
    })
});

export const updatePassSchema = Joi.object({
    password: Joi.string().min(6).required().messages({
        'string.min': 'PASSWORD_MUST_BE_6_CHARACTER_LONG',
        'string.empty': 'PASSWORD_IS_REQUIRED',
    }),
    confpassword: Joi.any().equal(Joi.ref('password')).required().messages({
        'any.only': 'CONFIRM_PASSWORD_DOES_NOT_MATCH',
    })
});

export const updateProfileSchema = Joi.object({
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
});