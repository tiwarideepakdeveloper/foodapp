import mongoose from "mongoose";

const emailTemplateSchema = new mongoose.Schema({
    langId: {
        type: Number,
        required: true,
    },
    identifier: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
});

emailTemplateSchema.index({ identifier: 1, langId: 1 }, { unique: true });

export default mongoose.model('EmailTemplate', emailTemplateSchema);