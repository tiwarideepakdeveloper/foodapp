import { ResponseHandler } from "../utility/responseHandler.js"

import Cms from "../model/Cms.js";
import Label from "../model/Label.js"

export const getDataByPageType = async (req, res) => {
    try {
        const { page } = req.params;
        if(!page){
            return ResponseHandler.badRequest(res, await Label.getLabel('CoNTENT_PAGE_NOT_FOUND'));
        }
        let cmsData = await Cms.find({ page }, { data: 1 });
        cmsData = cmsData.map((elem) => {
            elem.data.title = elem.data?.translations?.en?.title || elem.data.title;
            elem.data.desc = elem.data?.translations?.en?.desc || elem.data.desc;
            delete elem.data?.translations;
            return elem.data;
        });
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS'), cmsData);
    } catch (error) {
        console.log(error);
        return ResponseHandler.serverError(res, await Label.getLabel('SERVER_ERROR'));
    }
}