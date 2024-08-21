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
    translations: {
        type: Object, // code : {name: '', desc: ''}
    }
});

export default mongoose.model('ProductSize', sizeSchema);