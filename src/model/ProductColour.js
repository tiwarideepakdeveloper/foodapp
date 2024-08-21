import mongoose from "mongoose";

const colourSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
    },
    translations: {
        type: Object, // code : {name: '', desc: ''}
    }
});

export default mongoose.model('ProductColour', colourSchema);