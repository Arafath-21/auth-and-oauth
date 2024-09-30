import asyncHandler from '../utils/asyncHandler.js';

const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  res.status(200).json({
    message: 'File uploaded successfully',
    file: req.file,
  });
});

export default uploadFile; // Correct export
