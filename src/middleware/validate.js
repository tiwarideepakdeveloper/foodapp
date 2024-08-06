import Label from "../model/Label.js";
import { ResponseHandler } from "../utility/responseHandler.js";

export const validate = (schema) => {
    return async (req, res, next) => {
        const { error } = schema.validate(req.body, {abortEarly: false});
        if(error){
            const errors = error.details.map(err => err.message);
            return ResponseHandler.badRequest(res, await Label.getLabel('VALIDATION_ERROR'), errors);
        }
        return next();
    }
}