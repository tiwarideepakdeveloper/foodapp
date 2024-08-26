import { AppConstant } from "../constants/AppConstant.js";
import Label from "../model/Label.js";
import ProductColour from "../model/ProductColour.js";
import ProductSize from "../model/ProductSize.js";
import { ResponseHandler } from "../utility/responseHandler.js";

export const fetchRecords = async (req, res) => {
    try {
        let { type, page } = req.params;
        page = page || 1;
        let options;
        switch (type) {
            case AppConstant.PRODUCT_OPTION_SIZE:
                options = await ProductSize.find()
                    .skip((page - 1) * AppConstant.PAGE_SIZE)
                    .limit(AppConstant.PAGE_SIZE);
                break;
            case AppConstant.PRODUCT_OPTION_COLOUR:
                options = await ProductColour.find()
                    .skip((page - 1) * AppConstant.PAGE_SIZE)
                    .limit(AppConstant.PAGE_SIZE);
                break;
        }
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), options);
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('SERVER_ERROR', req.langCode));
    }
}

export const fetchRecord = async (req, res) => {
    try {
        let { type, id } = req.params;
        let option;
        switch (type) {
            case AppConstant.PRODUCT_OPTION_SIZE:
                option = await ProductSize.findById(id);
                break;
            case AppConstant.PRODUCT_OPTION_COLOUR:
                option = await ProductColour.findById(id);
                break;
        }
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), option);
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('SERVER_ERROR', req.langCode));
    }
}

export const saveRecord = async (req, res) => {
    try {
        const { type } = req.params;
        const { identifier, sortOrder, isActive } = req.body;
        switch (type) {
            case AppConstant.PRODUCT_OPTION_SIZE:
                if (await ProductSize.findOne({ identifier })) {
                    return ResponseHandler.badRequest(res, await Label.getLabel('SIZE_ALREADY_EXISIT'))
                }
                const size = new ProductSize({ identifier, sortOrder, isActive });
                return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), await size.save());
            case AppConstant.PRODUCT_OPTION_COLOUR:
                if (await ProductColour.findOne({ identifier })) {
                    return ResponseHandler.badRequest(res, await Label.getLabel('COLOUR_ALREADY_EXISIT'))
                }
                const colour = new ProductColour({ identifier, sortOrder, isActive });
                return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), await colour.save());
        }
        return ResponseHandler.badRequest(res, await Label.getLabel('UNKNOWN_REQUEST', req.langCode));
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('SERVER_ERROR', req.langCode));
    }
}

export const updateRecord = async (req, res) => {
    try {
        const { type, id } = req.params;
        const { identifier, sortOrder, isActive } = req.body;
        let option;
        switch (type) {
            case AppConstant.PRODUCT_OPTION_SIZE:
                option = await ProductSize.findById(id);
                break;
            case AppConstant.PRODUCT_OPTION_COLOUR:
                option = await ProductColour.findById(id);
                break;
        }
        if (!option) {
            return ResponseHandler.badRequest(res, await Label.getLabel('ITEM_DOES_NOT_EXISIT'))
        }
        option.identifier = identifier;
        option.sortOrder = sortOrder;
        option.isActive = isActive;
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), await option.save());
    } catch (error) {
        console.log(error);
        return ResponseHandler.badRequest(res, await Label.getLabel('SERVER_ERROR', req.langCode));
    }
}

export const deleteRecord = async (req, res) => {
    try {
        let { type, id } = req.params;
        let option;
        switch (type) {
            case AppConstant.PRODUCT_OPTION_SIZE:
                option = await ProductSize.findById(id).deleteOne();
                break;
            case AppConstant.PRODUCT_OPTION_COLOUR:
                option = await ProductColour.findById(id).deleteOne();
                break;
        }
        if (option) {
            return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), option);
        }
        return ResponseHandler.badRequest(res, await Label.getLabel('OPERATIONS_NOT_PERFORMED', req.langCode), option);
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('SERVER_ERROR', req.langCode));
    }
}