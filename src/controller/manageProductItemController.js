import { AppConstant } from "../constants/AppConstant.js";
import Label from "../model/Label.js";
import Product from "../model/Product.js";
import ProductColour from "../model/ProductColour.js";
import ProductItem from "../model/ProductItem.js";
import ProductSize from "../model/ProductSize.js";
import { AppUtility } from "../utility/AppUtility.js";
import { ResponseHandler } from "../utility/responseHandler.js";

export const fetchRecords = async (req, res) => {
    try {
        let { page } = req.params;
        page = page || 1;
        if (isNaN(page)) {
            return ResponseHandler.badRequest(res, await Label.getLabel('PAGE_SHOULD_BE_A_NUMBER', req.langCode));
        }
        const productItem = await ProductItem.find()
            .skip((page - 1) * AppConstant.PAGE_SIZE)
            .limit(AppConstant.PAGE_SIZE);
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), productItem);
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    }
}

export const fetchRecord = async (req, res) => {
    try {
        const productItem = await ProductItem.findById(req.params.id);
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), productItem);
    } catch (error) {
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    }
}

export const saveRecord = async (req, res) => {
    try {
        const { identifier, isActive, productId, productColourId, productSizeId, orignalPrice, salePrice, qtyInStock } = req.body;
        if (orignalPrice < salePrice) {
            return ResponseHandler.badRequest(res, await Label.getLabel('ORIGNAL_PRICE_CANNOT_LESS_THAN_SELL_PRICE', req.langCode));
        }
        if (!await Product.findOne({ isActive: true, _id: productId })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('EITHER_PRODUCT_NOT_EXISIT_OR_INACTIVE', req.langCode));
        }
        if (!await ProductColour.findOne({ isActive: true, _id: productColourId })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('EITHER_COLOUR_NOT_EXISIT_OR_INACTIVE', req.langCode));
        }
        if (!await ProductSize.findOne({ isActive: true, _id: productSizeId })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('EITHER_SIZE_NOT_EXISIT_OR_INACTIVE', req.langCode));
        }
        if (await Product.findOne({ slug: AppUtility.strToSlug(slug) })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('SLUG_ALREADY_EXISIT', req.langCode));
        }
        const productItem = new ProductItem({
            identifier, isActive,
            productId, productColourId,
            productSizeId, orignalPrice,
            salePrice, qtyInStock
        });
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), await productItem.save());
    } catch (error) {
        return ResponseHandler.serverError(res, await Label.getLabel('SERVER_ERROR', req.langCode));
    }
}

export const updateRecord = async (req, res) => {
    try {
        const productItem = await ProductItem.findById(req.params.id);
        if (!productItem) {
            return ResponseHandler.badRequest(res, await Label.getLabel('PRODUCT_ITEM_NOT_FOUND', req.langCode));
        }
        const { identifier, isActive, productId, productColourId, productSizeId, orignalPrice, salePrice, qtyInStock } = req.body;
        if (orignalPrice < salePrice) {
            return ResponseHandler.badRequest(res, await Label.getLabel('ORIGNAL_PRICE_CANNOT_LESS_THAN_SELL_PRICE', req.langCode));
        }
        if (!await Product.findOne({ isActive: true, _id: productId })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('EITHER_PRODUCT_NOT_EXISIT_OR_INACTIVE', req.langCode));
        }
        if (!await ProductColour.findOne({ isActive: true, _id: productColourId })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('EITHER_COLOUR_NOT_EXISIT_OR_INACTIVE', req.langCode));
        }
        if (!await ProductSize.findOne({ isActive: true, _id: productSizeId })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('EITHER_SIZE_NOT_EXISIT_OR_INACTIVE', req.langCode));
        }
        if (await Product.findOne({ slug: AppUtility.strToSlug(slug) })) {
            return ResponseHandler.badRequest(res, await Label.getLabel('SLUG_ALREADY_EXISIT', req.langCode));
        }
        productItem.identifier = identifier;
        productItem.isActive = isActive;
        productItem.productId = productId;
        productItem.productColourId = productColourId;
        productItem.productSizeId = productSizeId;
        productItem.orignalPrice = orignalPrice;
        productItem.salePrice = salePrice;
        productItem.qtyInStock = qtyInStock;
        return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode), await productItem.save());
    } catch (error) {
        return ResponseHandler.serverError(res, await Label.getLabel('SERVER_ERROR', req.langCode));
    }
}

export const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        if (await ProductItem.findById(id).deleteOne()) {
            return ResponseHandler.success(res, await Label.getLabel('SUCCESS', req.langCode));
        }
        return ResponseHandler.badRequest(res, await Label.getLabel('ERROR_FOUND_IN_OPERATIONS', req.langCode));
    } catch (error) {
        return ResponseHandler.serverError(res, await Label.getLabel('SERVER_ERROR', req.langCode));
    }
}