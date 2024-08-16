import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
        unique: true
    },
    translations: {
        type: Object,
    },
    permissions: [
        { type: String }
    ]
});

export default mongoose.model('Role', roleSchema);