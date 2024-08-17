import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    otpInfo: {
        type: Object,
    }
}, { timestamps: true });

userSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.otpInfo;
    return user;
};
export default mongoose.model('User', userSchema);