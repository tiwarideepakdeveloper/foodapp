import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory'
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductBrand'
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    translations: {
        type: Object, // code : {name: '', desc: '', careInstructions: ''}
    }
});

export default mongoose.model('Product', productSchema);