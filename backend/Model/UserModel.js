import mongoose from "mongoose";
import crypto from "crypto";
import { Roles } from "../utils/enums.js";

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String
        },
        role: {
            type: String,
            enum: Roles,
            default: "user",
        },
        addresses: [{
            label: String,
            pincode: String,
            city: String,
            state: String,
            country: { type: String, default: 'IN' },
            isDefault: { type: Boolean, default: false }
        }],
        contact: {
            type: String,
            required: true,
        },
        recentlyViewed: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                viewedAt: { type: Date, default: Date.now }
            }],
        resetPasswordToken: String,
        resetPasswordTokenExpire: Date,
    },
    { timestamps: true }

);

schema.methods.resetToken = function () {

    const token = crypto.randomBytes(20).toString('hex'); // create random 20 Bytes string and store in token

    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex'); // Create Hash(this.resetPasswordToken) using token(Const Variable) and chngeing the String to hex value

    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000; // Making expire time for created Hash(this.resetPasswordToken)

    return token;
}

export const User = mongoose.model('User', schema);



/*
const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String
        },
        role: {
            type: String,
            enum: Roles,
            default: "user",
        },
       
        contact: {
            type: String,
            required: true,
        },
        recentlyViewed: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                viewedAt: { type: Date, default: Date.now }
            }],
            resetPasswordToken: String,
            resetPasswordTokenExpire: Date,
    },
    { timestamps: true }

);

*/
