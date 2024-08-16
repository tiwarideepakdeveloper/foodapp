import { ResponseHandler } from "../utility/responseHandler.js";

export const checkPermission = (permissions) => {
    return async (req, res, next) => {
        if (!req.user) {
            return ResponseHandler.unauthorized(res, await Label.getLabel('ACCESS_DENIED'));
        }

        return next();
    }
}