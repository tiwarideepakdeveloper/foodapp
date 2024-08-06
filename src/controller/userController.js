import Label from "../model/Label.js";
import { ResponseHandler } from "../utility/responseHandler.js";

export const fetchAll = async (req, res) => {
    return ResponseHandler.success(res, await Label.getLabel('LIST_OF_USERS'), req.user);
}