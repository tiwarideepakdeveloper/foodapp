import Image from "../model/Image.js";
import { AppUtility } from "../utility/AppUtility.js";

export const showImage = async (req, res) => {
    try {
        const { recordId, type } = req.params;
        const image = await Image.findOne({ recordId, type });
        if (!image) {
            return res.sendFile(AppUtility.getDefaultImg());
        }
        return res.sendFile(image.path);
    } catch (error) {
        return res.sendFile(AppUtility.getDefaultImg());
    }
}