import mongoose from 'mongoose';


//   Website Image Schema

const websiteImageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100
    },
    altText: {
      type: String,
      trim: true,
      maxlength: 150
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    position: {
      type: String, // banner, hero, footer, etc.
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);


//   Courier Schema (CONFIGURATION ONLY)

const courierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true // Delhivery, BlueDart
    },
    code: {
      type: String,
      required: false // DEL, BD
    },
    isActive: {
      type: Boolean,
      default: true
    },
    supportsCOD: {
      type: Boolean,
      default: false
    },

    // Delivery capability
    serviceableZones: {
      local: { type: Boolean, default: true },
      zonal: { type: Boolean, default: true },
      national: { type: Boolean, default: true }
    },

    // Base rate card
    rateCard: {
      local: { type: Number, default: 0 },
      zonal: { type: Number, default: 0 },
      national: { type: Number, default: 0 }
    },

    // Weight-based pricing
    weightSlabs: [
      {
        minKg: Number,
        maxKg: Number,
        extraPerKg: Number
      }
    ]
  },
  { _id: true }
);

//  Website (Global Settings) Schema
 
const websiteSchema = new mongoose.Schema(
  {
    websiteviews: {
      type: Number,
      default: 0
    },

    images: [websiteImageSchema],

    pricing: {
      taxPercentage: {
        type: Number,
        default: 18
      },
      minOrderValue: {
        type: Number,
        default: 0
      }
    },

    shipping: {
      countries: {
        type: Map,
        of: new mongoose.Schema(
          {
            currency: {
              type: String,
              default: 'INR'
            },

            zoneRates: {
              local: { type: Number, default: 0 },
              zonal: { type: Number, default: 0 },
              national: { type: Number, default: 0 }
            },

            couriers: [courierSchema]
          },
          { _id: true }
        )
      }
    },

    contact: {
      email: String,
      phone: String
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

export const Website = mongoose.model('Website', websiteSchema);
