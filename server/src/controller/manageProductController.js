import { AppConstant } from "../constants/AppConstant.js";
import Label from "../model/Label.js";
import Product from "../model/Product.js";
import ProductBrand from "../model/ProductBrand.js";
import ProductCategory from "../model/ProductCategory.js";
import { AppUtility } from "../utility/AppUtility.js";
import { ResponseHandler } from "../utility/responseHandler.js";

export const fetchRecords = async (req, res) => {
    try {
        let { page } = req.params;
        page = page || 1;
        if (isNaN(page)) {
            return ResponseHandler.badRequest(res, await Label.getLabel('PAGE_SHOULD_BE_A_NUMBER', req.langCode));
        }
        const product = await Product.find()
            .skip((page - 1) * AppConstant.PAGE_SIZE)
            .limit(AppConstant.PAGE_SIZE);
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), product);
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    }
}

export const fetchRecord = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), product);
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    }
}

export const saveRecord = async (req, res) => {
    try {
        const { identifier, slug, isActive, categoryId, brandId } = req.body;
        if (!await ProductCategory.findOne({ isActive: true, _id: categoryId })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('PRODUCT_ALREADY_EXISIT', req.langCode));
        }
        if (!await ProductBrand.findOne({ isActive: true, _id: brandId })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('EITHER_BRAND_NOT_EXISIT_OR_INACTIVE', req.langCode));
        }
        if (await Product.findOne({ identifier })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('PRODUCT_ALREADY_EXISIT', req.langCode));
        }
        if (await Product.findOne({ slug: AppUtility.strToSlug(slug) })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('SLUG_ALREADY_EXISIT', req.langCode));
        }
        const product = new Product({
            identifier, isActive,
            categoryId, brandId,
            slug: AppUtility.strToSlug(slug)
        });
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), await product.save());
    } catch (error) {
        return ResponseHandler.serverError(res, await Label.getLabel('SERVER_ERROR', req.langCode));
    }
}

export const updateRecord = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return ResponseHandler.badRequest(res, await Label.getLabel('PRODUCT_NOT_FOUND', req.langCode));
        }
        const { identifier, slug, isActive, categoryId, brandId } = req.body;
        if (!await ProductCategory.findOne({ isActive: true, _id: categoryId })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('PRODUCT_ALREADY_EXISIT', req.langCode));
        }
        if (!await ProductBrand.findOne({ isActive: true, _id: brandId })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('EITHER_BRAND_NOT_EXISIT_OR_INACTIVE', req.langCode));
        }
        let cond = {
            $and: [
                { _id: { $ne: req.params.id } },
                {
                    $or: [
                        { identifier },
                        { slug: AppUtility.strToSlug(slug) },
                    ],
                }
            ]
        };
        if (await Product.findOne(cond)) {
            return ResponseHandler.badRequest(res, await Label.getLabel('SLUG_OR_IDENTIFIER_ALREADY_EXISIT', req.langCode));
        }
        product.identifier = identifier;
        product.isActive = isActive;
        product.categoryId = categoryId;
        product.brandId = brandId;
        product.slug = AppUtility.strToSlug(slug);
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), await product.save());
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