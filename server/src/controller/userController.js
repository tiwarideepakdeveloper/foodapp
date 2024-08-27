import { AppConstant } from "../constants/AppConstant.js";
import { ResponseHandler } from "../utility/responseHandler.js";
import Label from "../model/Label.js";
import User from "../model/User.js";
import { AppUtility } from "../utility/AppUtility.js";

export const fetchRecords = async (req, res) => {
    try {
        let { page } = req.params;
        page = page || 1;
        const users = await User.find({ _id: { $ne: req.user.id } })
            .sort({ createdAt: -1 })
            .skip((page - 1) * AppConstant.PAGE_SIZE)
            .limit(AppConstant.PAGE_SIZE);
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), users);
    } catch (error) {
        console.log(error);
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    }
}

export const saveRecord = async (req, res) => {
    try {
        const { firstName, lastName, email, password, roleId, isActive } = req.body;
        const user = new User({ firstName, lastName, email, password, roleId, isActive, isVerified: true });
        if (!await user.save()) {
            return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
        }
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode));
    } catch (error) {
        console.log(error);
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    }
}

export const updateRecord = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return ResponseHandler.badRequest(res, await Label.getLabel('USER_NOT_FOUND', req.langCode));
        }
        const { firstName, lastName, email, password, roleId, isActive } = req.body;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.roleId = roleId;
        user.isActive = isActive;
        user.password = AppUtility.hashPassword(password);
        await user.save();
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), user);
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    }
}

export const deleteRecord = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return ResponseHandler.badRequest(res, await Label.getLabel('INVALID_REQUEST', req.langCode));
        }
        const user = await User.findById(userId);
        if (!user) {
            return ResponseHandler.badRequest(res, await Label.getLabel('INVALID_REQUEST', req.langCode));
        }
        if (!await user.deleteOne()) {
            return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
        }
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode));
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    }
}