import mongoose from 'mongoose';
import { Ledger_Type } from '../utils/enums.js';

const ledgerSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Orders'
  },

  type: {
    type: String,
    enum: Ledger_Type,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },

  region: {
    type: String // IN, EU, US etc
  },

  note: {
    type: String
  }
}, { timestamps: true });

export const SellerLedger = mongoose.model('SellerLedger', ledgerSchema);
