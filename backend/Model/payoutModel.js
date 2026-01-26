import mongoose from 'mongoose';
import { Payment_Method } from '../utils/enums.js';

const payoutSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  periodStart: {
    type: Date,
    required: true
  },

  periodEnd: {
    type: Date,
    required: true
  },

  grossAmount: {
    type: Number,
    required: true
  },

  commission: {
    type: Number,
    required: true
  },

  netAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: Payment_Method,
    default: 'PENDING'
  },

  paidAt: {
    type: Date
  }
}, { timestamps: true });

export const Payout = mongoose.model('Payout', payoutSchema);
