import { ResponseHandler } from "../utility/responseHandler.js";

export const index = async (req, res) => {
    return ResponseHandler.render(res, 'dashboard/index');
}