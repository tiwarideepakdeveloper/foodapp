import jwt from 'jsonwebtoken';
import { ResponseHandler } from "../utility/responseHandler.js";

import Label from "../model/Label.js";
import User from "../model/User.js";

export const auth = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const existUser = await User.findById(decoded.id).populate({ path: 'roleId', select: 'permissions' });
            if (!existUser) {
                return ResponseHandler.unauthorized(res, await Label.getLabel('INVALID_TOKEN'));
            }
            if (!existUser.isVerified || !existUser.isActive) {
                return ResponseHandler.unauthorized(res, await Label.getLabel('USER_NOT_VERIFIED/ACTIVE'));
            }
            req.user = existUser.toJSON();
            return next();
        }
        return ResponseHandler.unauthorized(res, await Label.getLabel('UNAUTHORISED_ACCESS'));
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('SERVER_ERROR'), error.message);
    }
}