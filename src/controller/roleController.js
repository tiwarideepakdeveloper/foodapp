import Label from '../model/Label.js';
import Permission from '../model/Permission.js';
import Role from '../model/Role.js';
import { ResponseHandler } from '../utility/responseHandler.js';

export const getData = (req, res) => {

}

export const setup = async (req, res) => {
    try {
        const { identifier, permissions } = req.body;
        const permObj = new Permission();
        if (!await permObj.validatePermissions(permissions)) {
            return ResponseHandler.unauthorized(res, permObj.getError());
        }
        const role = await Role.find({ identifier }) || new Role();
        role.permissions = permissions;
        await role.save();
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS'));
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS'));
    }
}