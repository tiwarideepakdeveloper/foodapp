import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    productColourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductColour'
    },
    productSizeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductSize'
    },
    orignalPrice: {
        type: Number,
        required: true,
    },
    salePrice: {
        type: Number,
        required: true,
    },
    qtyInStock: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true
    }
});

export default mongoose.model('ProductSize', sizeSchema);