import moment from 'moment/moment.js';

import { ResponseHandler } from "../utility/responseHandler.js";
import { AppUtility } from '../utility/AppUtility.js';
import { emailServices } from '../services/emailService.js';

import EmailTemplate from '../model/EmailTemplate.js';
import Label from '../model/Label.js';
import User from "../model/User.js";

export const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const existUser = await User.findOne({ email });
        if (existUser) {
            return ResponseHandler.badRequest(res, await Label.getLabel('USER_ALREADY_EXIST'))
        }
        const user = new User({ firstName, lastName, email, password: await AppUtility.hashPassword(password) });
        user.otpInfo = {
            otp: AppUtility.genrateOtp(),
            expire: moment().add(6, 'minutes')
        };
        await sendActivationMail(existUser);
        return ResponseHandler.created(
            res,
            await Label.getLabel('USER_REGISTERED_SUCCESSFULLY!'),
            await user.save()
        );
    } catch (error) {
        return ResponseHandler.serverError(res, await Label.getLabel('SERVER_ERROR'), error);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return ResponseHandler.badRequest(res, await Label.getLabel('USER_IS_NOT_REGISTERED!'));
        }
        if (!(await user.verifyPassword(password))) {
            return ResponseHandler.unauthorized(
                res,
                await Label.getLabel('YOUR_PASSWORD_IS_NOT_CORRECT')
            );
        }
        user = user.toJSON();
        user.token = AppUtility.genrateJwtToken(user._id);
        return ResponseHandler.success(res, await Label.getLabel('USER_LOGGEDIN_SUCCESS'), user);
    } catch (error) {
        return ResponseHandler.serverError(res, await Label.getLabel('SERVER_ERROR'));
    }
}

export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const existUser = await User.findOne({ email });
        if (!existUser) {
            return ResponseHandler.badRequest(res, await Label.getLabel('USER_NOT_FOUND'));
        }
        existUser.otpInfo = {
            otp: AppUtility.genrateOtp(),
            expire: moment().add(6, 'minutes')
        };
        await existUser.save();

        /** Send Otp Email */
        await sendActivationMail(existUser);
        return ResponseHandler.success(res, await Label.getLabel('OTP_SENT_ON_YOUR_EMAIL'));
    } catch (error) {
        return ResponseHandler.serverError(res, await Label.getLabel('SERVER_ERROR'));
    }
}


export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const existUser = await User.findOne({ email });
        if (!existUser) {
            return ResponseHandler.badRequest(res, await Label.getLabel('USER_NOT_FOUND'));
        }
        if (existUser.otpInfo.otp != otp || existUser.otpInfo.expire < moment()) {
            return ResponseHandler.badRequest(res, await Label.getLabel('INVALID_OTP_OR_OTP_EXPIRED'));
        }
        existUser.isVerified = true;
        await existUser.save();

        const user = existUser.toJSON();
        user.token = AppUtility.genrateJwtToken(user._id);
        return ResponseHandler.success(res, await Label.getLabel('OTP_VERIFIED_SUCCESS'), user);
    } catch (error) {
        return ResponseHandler.serverError(res, await Label.getLabel('SERVER_ERROR'));
    }
}


export const updatePassword = async (req, res) => {
    try {
        const { password } = req.body;
        const user = await User.findOne({ email: req.user.email });
        user.password = await AppUtility.hashPassword(password);
        await user.save();
        return ResponseHandler.success(res, await Label.getLabel('YOUR_PASSWORD_UPDATED'));
    } catch (error) {
        return ResponseHandler.serverError(res, await Label.getLabel('SERVER_ERROR'));
    }
}

const sendActivationMail = async (user) => {
    const emailTemplate = await EmailTemplate.findOne({ langId: 1, identifier: 'user_send_otp_email' });
    if (!emailTemplate) {
        return false;
    }
    emailTemplate.body = emailTemplate.body.replace('{otp}', user.otpInfo.otp);
    emailTemplate.body = emailTemplate.body.replace('{expire}', moment(user.otpInfo.expire).format('DD/MM/YYYY HH:mm A'));
    (new emailServices()).sendMail(user.email, emailTemplate);
    return true;
}