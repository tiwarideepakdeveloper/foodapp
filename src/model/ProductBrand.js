import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    translations: {
        type: Object, // code : {name: '', desc: ''}
    }
});

export default mongoose.model('ProductBrand', brandSchema);