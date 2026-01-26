import mongoose from 'mongoose';

const balanceSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true
  },

  availableBalance: {
    type: Number,
    default: 0
  },

  pendingBalance: {
    type: Number,
    default: 0
  },

  totalEarned: {
    type: Number,
    default: 0
  },

  totalRefunded: {
    type: Number,
    default: 0
  },

  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export const SellerBalance = mongoose.model('SellerBalance', balanceSchema);
