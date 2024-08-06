import mongoose from "mongoose";

const labelSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    translations: {
        type: Object,
    }
});

labelSchema.statics.getLabel = async function(key, code = 'en') {
    try {
        const existLabel = await this.findOne({ key });
        if(existLabel){
            return existLabel.code;
        }
        const selfClass = new this({ key });
        selfClass.translations = selfClass.translations || {};
        selfClass.translations[code] = key.replaceAll('_', ' ').toLowerCase();
        await selfClass.save();
        return selfClass.translations[code];
    } catch (error) {
        console.log(error);
        return 'SERVER ERROR | DB ERROR';
    }
}

export default mongoose.model('Label', labelSchema);