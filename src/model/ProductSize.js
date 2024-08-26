import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
    },
    sortOrder: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        required: true
    },
    translations: {
        type: Object, // code : {name: '', desc: ''}
    }
});

export default mongoose.model('ProductSize', sizeSchema);