import mongoose from 'mongoose';

const saleEventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startAt: {
    type: Date,
    required: true
  },
  endAt: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  rules: [
    {
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      },
      discountType: {
        type: String,
        enum: ['flat', 'percentage'],
        required: true
      },
      discountValue: {
        type: Number,
        required: true
      }
    }
  ]
}, { timestamps: true });




const sellerEventConsentSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SaleEvent',
    required: true
  },
  catagory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catagory',
    required: true
  },
  status: {
    type: String,
    enum: ['accepted', 'rejected'],
    default: 'accepted'
  }
}, { timestamps: true });


export const SaleEvent = mongoose.model('SaleEvent', saleEventSchema);
export const SellerEventConsent = mongoose.model('SellerEventConsent',sellerEventConsentSchema);
