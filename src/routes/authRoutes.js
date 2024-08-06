import express from "express";

import { forgetPassword, login, register, updatePassword, verifyOtp } from "../controller/authController.js";

import { forgetPassSchema, loginSchema, registerSchema, updatePassSchema, verifyOtpSchema } from "../validations/authValidation.js";
import { validate } from "../middleware/validate.js";
import { auth } from "../middleware/authMiddleware.js";

const authRoute = express.Router();

authRoute.post('/register', validate(registerSchema), register);
authRoute.post('/login', validate(loginSchema), login);

authRoute.post('/forget-password', validate(forgetPassSchema), forgetPassword);
authRoute.post('/verify-otp', validate(verifyOtpSchema), verifyOtp);
authRoute.post('/update-password', [validate(updatePassSchema), auth], updatePassword);

export default authRoute;