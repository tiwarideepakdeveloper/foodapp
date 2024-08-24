import Label from "../model/Label.js";
import { ResponseHandler } from "../utility/responseHandler.js";

export const checkPermission = (permission) => {
    return async (req, res, next) => {
        return next();
        if (!req.user || !req.user?.roleId) {
            return ResponseHandler.accessDenied(res, await Label.getLabel('ACCESS_DENIED'));
        }
        if (!req.user.roleId.permissions?.includes(permission)) {
            return ResponseHandler.accessDenied(res, await Label.getLabel('ACCESS_DENIED'));
        }
        return next();
    }
}