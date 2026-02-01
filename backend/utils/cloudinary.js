import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import 'dotenv/config'; // Add this at the absolute top of your entry file
import express from 'express';
// ... other imports
import sharp from "sharp";
import fs from "fs-extra";
import path from "path";
import os from "os";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
/**
 * Uploads a buffer to Cloudinary
 * @param {Buffer} buffer - The file buffer from multer (req.file.buffer)
 * @param {String} folder - The Cloudinary folder name
 * @returns {Promise<String>} - The secure URL of the uploaded image
 * @param {String} publicId - The ID of the image (found in the URL)
 */

export const uploadToCloudinary = async (buffer, folder = "products") => {
  const tempFile = path.join(os.tmpdir(), `img-${Date.now()}.jpg`);

  try {
    await sharp(buffer)
      .resize(128, 128, { fit: "inside" })
      .jpeg({ quality: 80 })
      .toFile(tempFile);

    const result = await cloudinary.uploader.upload(tempFile, {
      folder,
      resource_type: "image",
    });

    return result;
  } finally {
    await fs.remove(tempFile); // always cleanup
  }
};




export const uploadProductImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) return res.status(400).send("No files");

    // Map each file to an upload promise
    const uploadPromises = req.files.map(file =>
      uploadToCloudinary(file.buffer, "products")
    );

    // Run all uploads in parallel
    const imageUrls = await Promise.all(uploadPromises);

    // imageUrls will be an array of strings: ["https://...", "https://..."]
    res.status(200).json({ urls: imageUrls });
    
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    throw error;
  }
};