import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    recordId: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Image', imageSchema);