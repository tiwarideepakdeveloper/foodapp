import { ResponseHandler } from "../utility/responseHandler.js";
import Label from '../model/Label.js';

export const index = async (req, res) => {
    return ResponseHandler.render(res, 'dashboard/index', {loggedUser: req.session.user});
}

export const logout = async (req, res) => {
    try {
         req.session.destroy(async (err) => {
            if (err) {
                return ResponseHandler.serverError(res, await Label.getLabel('ERROR_LOGGING_OUT', req.langCode));
            }
            res.clearCookie('connect.sid');
            res.redirect('/');
        });
    } catch(error) {
        return ResponseHandler.serverError(res, await Label.getLabel('INVALID_REQUEST', req.langCode));
    }
    
}