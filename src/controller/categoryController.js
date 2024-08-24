import { AppConstant } from "../constants/AppConstant.js";
import Label from "../model/Label.js";
import ProductCategory from "../model/ProductCategory.js";
import { AppUtility } from "../utility/AppUtility.js";
import { ResponseHandler } from "../utility/responseHandler.js";

export const fetchRecords = async (req, res) => {
    try {
        let { page } = req.params;
        page = page || 1;
        const category = await ProductCategory.find()
            .skip((page - 1) * AppConstant.PAGE_SIZE)
            .limit(AppConstant.PAGE_SIZE);
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), category);
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    }
}

export const fetchRecord = async (req, res) => {
    try {
        const category = await ProductCategory.findById(req.params);
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), category);
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    }
}

export const saveRecord = async (req, res) => {
    try {
        const { identifier, slug, parentId, isActive } = req.body;
        if (await ProductCategory.findOne({ identifier })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('CATEGORY_ALREADY_EXISIT', req.langCode));
        }
        if (await ProductCategory.findOne({ slug: AppUtility.strToSlug(slug) })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('SLUG_ALREADY_EXISIT', req.langCode));
        }
        if (parentId && !await ProductCategory.findOne({ parentId })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('PARENT_ID_DOES_NOT_EXISIT', req.langCode));
        }
        let createJson = {
            identifier,
            isActive,
            slug: AppUtility.strToSlug(slug)
        };
        if (parentId) {
            createJson['parentId'] = parentId;
        }
        const category = new ProductCategory(createJson);
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), await category.save());
    } catch (error) {
        return ResponseHandler.serverError(res, await Label.getLabel('SERVER_ERROR', req.langCode));
    }
}

export const updateRecord = async (req, res) => {
    try {
        const category = await ProductCategory.findById(req.params.id);
        if (!category) {
            return ResponseHandler.badRequest(res, await Label.getLabel('CATEGORY_NOT_FOUND', req.langCode));
        }
        const { identifier, slug, parentId, isActive } = req.body;
        let cond = {
            $and: [
                { id: { $ne: req.params.id } },
                {
                    $or: {
                        slug: AppUtility.strToSlug(slug),
                        identifier: identifier
                    }
                }
            ]
        };
        if (await ProductCategory.findOne(cond)) {
            return ResponseHandler.badRequest(res, await Label.getLabel('SLUG_OR_IDENTIFIER_ALREADY_EXISIT', req.langCode));
        }
        if (parentId) {
            const parentCat = await ProductCategory.findOne({ parentId });
            if (!parentCat) {
                return ResponseHandler.badRequest(res, await Label.getLabel('PARENT_ID_DOES_NOT_EXISIT', req.langCode));
            }
            if (parentCat?.parentId) {
                return ResponseHandler.badRequest(res, await Label.getLabel('SUB_CATEGORY_CANNOT_ASSIGN_AS_PARRENT', req.langCode));
            }
        }
        category.identifier = identifier;
        category.isActive = isActive;
        category.slug = AppUtility.strToSlug(slug);
        if (parentId) {
            category.parentId = parentId;
        }
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), await category.save());
    } catch (error) {
        return ResponseHandler.serverError(res, await Label.getLabel('SERVER_ERROR', req.langCode));
    }
}

export const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        if (await ProductCategory.findOne({ parentId: id })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('CAN_NOT_DELETE_ASSIGNED_AS_PARENT', req.langCode));
        }
        if (await ProductCategory.findById(id).deleteOne()) {
            return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode));
        }
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    } catch (error) {
        return ResponseHandler.serverError(res, await Label.getLabel('SERVER_ERROR', req.langCode));
    }
}