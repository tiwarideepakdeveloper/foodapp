import { AppConstant } from '../constants/AppConstant.js';
import Label from '../model/Label.js';
import Permission from '../model/Permission.js';
import Role from '../model/Role.js';
import { ResponseHandler } from '../utility/responseHandler.js';

export const fetchRecords = async (req, res) => {
    try {
        let { page } = req.params;
        page = page || 1;
        const roles = await Role.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * AppConstant.PAGE_SIZE)
            .limit(AppConstant.PAGE_SIZE);
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), roles);
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    }
}

export const saveRecord = async (req, res) => {
    try {
        const { identifier, permissions } = req.body;
        const permObj = new Permission(req.langCode);
        if (!await permObj.validatePermissions(permissions)) {
            return ResponseHandler.unauthorized(res, permObj.getError());
        }
        const roleM = await Role.findOne({ identifier }) || new Role();
        roleM.identifier = identifier;
        roleM.permissions = permissions;
        await roleM.save();
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode));
    } catch (error) {
        console.log(error);
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    }
}

export const updateRecord = async (req, res) => {
    try {
        const { roleId } = req.params;
        if (!roleId) {
            return ResponseHandler.badRequest(res, await Label.getLabel('INVALID_REQUEST', req.langCode));
        }
        const role = await Role.findById(roleId);
        if (!role) {
            return ResponseHandler.badRequest(res, await Label.getLabel('INVALID_REQUEST', req.langCode));
        }
        const { identifier, permissions } = req.body;
        role.identifier = identifier;
        role.permissions = permissions;
        if (!await role.save()) {
            return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
        }
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), role);
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    }
}

export const deleteRecord = async (req, res) => {
    try {
        const { roleId } = req.params;
        if (!roleId) {
            return ResponseHandler.badRequest(res, await Label.getLabel('INVALID_REQUEST', req.langCode));
        }
        const role = await Role.findById(roleId);
        if (!role) {
            return ResponseHandler.badRequest(res, await Label.getLabel('INVALID_REQUEST', req.langCode));
        }
        if (!await role.deleteOne()) {
            return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
        }
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode));
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    }
}