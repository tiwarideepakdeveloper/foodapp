import { required } from "joi";
import mongoose from "mongoose";

langSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Language', langSchema);