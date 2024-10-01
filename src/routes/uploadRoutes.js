import express from 'express';
import { uploadFile } from '../controllers/uploadController.js'; // Correct import
import { upload } from '../middleware/upload.js'; // Assuming this is correctly set up with multer

const router = express.Router();

// Define the POST route for file uploads
router.post('/upload', upload.single('file'), uploadFile); // Make sure `upload.single('file')` matches your form field

export default router;
