import multer from 'multer';

// 1. Switch to memoryStorage
const storage = multer.memoryStorage();

// 2. Define your middleware using the memory storage
// No need for uuid here anymore; Cloudinary handles unique naming.

export const uploadFie = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Optional: 10MB limit
}).array('images', 6);

export const upload = multer({ 
    storage 
}).single('image');

export const singleFileUpload = multer({ 
    storage 
}).single('avatar');

// For routes that don't expect files but use multipart/form-data

export const uploadNone = multer({ storage }).none();

