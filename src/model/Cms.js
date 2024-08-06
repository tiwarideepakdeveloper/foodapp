import mongoose from "mongoose";

const cmsSchema = new mongoose.Schema({
    page: {
        type: Number,
        required: true,
    },
    data: {
        type: Object
    }
});

export default mongoose.model('Cms', cmsSchema);