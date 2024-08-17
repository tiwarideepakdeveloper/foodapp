import Label from "../model/Label.js";
import { ResponseHandler } from "../utility/responseHandler.js";

export const checkPermission = (permission) => {
    return async (req, res, next) => {
        if (!req.user || !req.user?.role_id) {
            return ResponseHandler.accessDenied(res, await Label.getLabel('ACCESS_DENIED'));
        }
        if (!req.user.role_id.permissions?.includes(permission)) {
            return ResponseHandler.accessDenied(res, await Label.getLabel('ACCESS_DENIED'));
        }
        return next();
    }
}