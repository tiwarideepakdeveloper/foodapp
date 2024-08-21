import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory'
    },
    translations: {
        type: Object, // code : {name: '', desc: ''}
    }
});

export default mongoose.model('ProductCategory', categorySchema);