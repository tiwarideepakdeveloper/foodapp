import { AppConstant } from "../constants/AppConstant.js";
import Label from "../model/Label.js";
import ProductBrand from "../model/ProductBrand.js";
import { AppUtility } from "../utility/AppUtility.js";
import { ResponseHandler } from "../utility/responseHandler.js";

export const index = async (req, res) => {
    return ResponseHandler.render(res, 'dashboard/brand/index', {loggedUser: req.session.user});
}

export const create = async (req, res) => {
    return ResponseHandler.render(res, 'dashboard/brand/create', {loggedUser: req.session.user}); 
}

export const fetchRecords = async (req, res) => {
    try {
        let { page } = req.params;
        page = page || 1;
        if (isNaN(page)) {
            return ResponseHandler.badRequest(res, await Label.getLabel('PAGE_SHOULD_BE_A_NUMBER', req.langCode));
        }
        const brand = await ProductBrand.find()
            .skip((page - 1) * AppConstant.PAGE_SIZE)
            .limit(AppConstant.PAGE_SIZE);
        // return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), brand);
        return ResponseHandler.render(res, 'brand/index');
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    }
}

export const fetchRecord = async (req, res) => {
    try {
        const brand = await ProductBrand.findById(req.params.id);
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), brand);
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    }
}

export const saveRecord = async (req, res) => {
    try {
        const { identifier, slug, isActive } = req.body;
        if (await ProductBrand.findOne({ identifier })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('BRAND_ALREADY_EXISIT', req.langCode));
        }
        if (await ProductBrand.findOne({ slug: AppUtility.strToSlug(slug) })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('SLUG_ALREADY_EXISIT', req.langCode));
        }
        const brand = new ProductBrand({
            identifier,
            isActive,
            slug: AppUtility.strToSlug(slug)
        });
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), await brand.save());
    } catch (error) {
        return ResponseHandler.serverError(res, await Label.getLabel('SERVER_ERROR', req.langCode));
    }
}

export const updateRecord = async (req, res) => {
    try {
        const brand = await ProductBrand.findById(req.params.id);
        if (!brand) {
            return ResponseHandler.badRequest(res, await Label.getLabel('BRAND_NOT_FOUND', req.langCode));
        }
        const { identifier, slug, isActive } = req.body;
        let cond = {
            $and: [
                { _id: { $ne: req.params.id } },
                {
                    $or: [
                        { slug: AppUtility.strToSlug(slug) },
                        { identifier: identifier }
                    ]
                }
            ]
        };
        if (await ProductBrand.findOne(cond)) {
            return ResponseHandler.badRequest(res, await Label.getLabel('SLUG_OR_IDENTIFIER_ALREADY_EXISIT', req.langCode));
        }
        brand.identifier = identifier;
        brand.isActive = isActive;
        brand.slug = AppUtility.strToSlug(slug);
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), await brand.save());
    } catch (error) {
        return ResponseHandler.serverError(res, await Label.getLabel('SERVER_ERROR', req.langCode));
    }
}

export const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        if (await ProductBrand.findById(id).deleteOne()) {
            return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode));
        }
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    } catch (error) {
        return ResponseHandler.serverError(res, await Label.getLabel('SERVER_ERROR', req.langCode));
    }
}