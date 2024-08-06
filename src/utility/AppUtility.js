import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AppUtility {
    static genrateOtp = () => {
        return Math.floor(100000 + Math.random() * 900000);
    }

    static hashPassword = async (password) => {
        return await bcrypt.hash(password, 10);
    };

    static genrateJwtToken(_id) {
        return jwt.sign({ id: _id }, process.env.JWT_SECRET, { expiresIn: '1h' });;
    }

    static getDefaultImg(){
        return process.cwd()+'/src/assets/default.png';
    }
}