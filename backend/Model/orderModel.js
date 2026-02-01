import mongoose from 'mongoose';
import { Order_Status, Payment_Status } from '../utils/enums.js';

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        posetelCode: { type: String, required: true }
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },

            name: { type: String, required: true },
            image: { type: String, required: true },

            qty: { type: Number, required: true },

            originalPrice: { type: Number, required: true }, // before discount
            finalPrice: { type: Number, required: true },    // after discount

            seller: {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                name: { type: String, required: true }
            }
        }
    ],

    subtotal: {
        type: Number,
        required: true
    },

    discountAmount: {
        type: Number,
        default: 0
    },

    shippingAmount: {
        type: Number,
        default: 0
    },

    taxAmount: {
        type: Number,
        default: 0
    },

    totalAmount: {
        type: Number,
        required: true
    },

    discountMeta: {
        type: {
            type: String,
            enum: ['EVENT', 'COUPON', 'NONE'],
            default: 'NONE'
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SaleEvent'
        },
        couponCode: String
    },

    paymentInfo: {
        id: { type: String, required: true },
        status: {
            type: String,
            enum: Payment_Status,
            required: true
        }
    },

    paidAt: Date,
    deliveredAt: Date,
    orderStatus: {
        type: String,
        enum: Order_Status,
        default: 'processing'
    }

}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);
