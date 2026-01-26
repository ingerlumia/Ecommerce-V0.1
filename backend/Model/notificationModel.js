import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  title: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: [
      'SALE_EVENT',
      'ORDER',
      'PRODUCT',
      'CATEGORY',
      'REPORT',
      'SYSTEM'
    ],
    default: 'SYSTEM'
  },

  relatedId: {
    type: mongoose.Schema.Types.ObjectId
  },
  catagory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catagory',
    required: true
  },
  redirectUrl: {
    type: String
  },

  meta: {
    type: Object
  },

  isRead: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export const Notification = mongoose.model('Notification', notificationSchema);
