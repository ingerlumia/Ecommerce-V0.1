import mongoose from 'mongoose';


const schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  attributes: [
    {
      key: { type: String, required: true },
      label: { type: String, required: true },
      type: { type: String, default: "select" },
      values: [String]
    }
  ],
  seo: {
    metaTitle: { type: String, maxlength: 60 },
    metaDescription: { type: String, maxlength: 160 },
    slug: { type: String, unique: true},
    keywords: [String]
  }
},{timestamps: true});

export const Catagory = mongoose.model("Catagory", schema);

