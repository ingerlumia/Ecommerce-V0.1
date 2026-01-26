import mongoose from 'mongoose';
import { Product_Status } from '../utils/enums.js';


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Product Name'],
        trim: true,
        maxLength: [100, 'Product Name cannot exceed 100 characters']

    },
    pricing: {
        mrp: { type: Number, required: true },
        basePrice: { type: Number, required: true },

        sellerDeal: {
            dealPrice: Number,
            startAt: Date,
            endAt: Date,
            isActive: { type: Boolean, default: false },
            approved: { type: Boolean, default: false }
        }
    },
    description: {
        type: String,
        required: [true, 'Please Enter Product Description']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            image: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Catagory",
        required: true
    },
    attributes: {
        type: Map,
        of: String
    },
    baseShippingPrice: {
        type: Number, default: 0
    },
    seller: {
        id: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: [true, 'Please Enter Product Seller']
        },

    },
    stock: {
        type: Number,
        required: [true, 'Please Enter Product Stock'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    status: {
        type: String,
        enum: Product_Status,
        default: 'pending',
        trim: true

    },
    views: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    seo: {
        metaTitle: { type: String, maxlength: 60 },
        metaDescription: { type: String, maxlength: 160 },
        slug: { type: String, unique: true, required: true },
        keywords: [String]
    }
}, { timestamps: true });



export const Product = mongoose.model('Product', schema);

/*
const schema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    mrp:{
        type: Number,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    sold:{
        type: Number,
        default: 0,
    },
    category:{
        type: String,
        required: true,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }




});

export const Product = mongoose.model('Product',schema);
*/

