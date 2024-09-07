import express from "express";
import { validate } from "../middleware/validate.js";
import { auth } from "../middleware/authMiddleware.js";
import { forgetPassSchema, loginSchema, registerSchema, updatePassSchema, verifyOtpSchema, updateProfileSchema } from "../validations/authValidation.js";
import { loginView, forgetPassword, login, register, updatePassword, verifyOtp, fetchProfile, updateProfileImg } from "../controller/authController.js";

const authRoute = express.Router();

authRoute.post('/register', validate(registerSchema), register);
authRoute.post('/login', validate(loginSchema), login);

authRoute.post('/forget-password', validate(forgetPassSchema), forgetPassword);
authRoute.post('/verify-otp', validate(verifyOtpSchema), verifyOtp);
authRoute.post('/update-password', [auth, validate(updatePassSchema)], updatePassword);

authRoute.post('/update-profile', [auth, validate(updateProfileSchema)], fetchProfile);
authRoute.post('/update-profile-img', auth, updateProfileImg);
export default authRoute;