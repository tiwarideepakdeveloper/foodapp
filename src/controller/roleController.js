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
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    }
}

export const updateRecord = async (req, res) => {

}

export const deleteRecord = async (req, res) => {

}