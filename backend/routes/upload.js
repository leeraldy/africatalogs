const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

// Load environment variables
dotenv.config();

// Initialize AWS S3 client using AWS SDK v3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// File type validation
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed (jpg, jpeg, png)'));
  }
}

// Multer configuration for handling file uploads locally (before uploading to S3)
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory for quick access
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit files to 5MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Function to handle file upload to S3
async function uploadFileToS3(file) {
  try {
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        Key: `${Date.now()}_${file.originalname}`, // Ensure unique filenames using timestamp
        Body: file.buffer, // Using file buffer from multer
        ContentType: file.mimetype, // Set correct MIME type
      },
    });

    upload.on('httpUploadProgress', (progress) => {
      console.log(progress); // Log progress during the upload
    });

    const result = await upload.done();
    return result.Location; // Return the URL of the uploaded file from S3
  } catch (error) {
    console.error('Error during S3 upload:', error);
    throw error;
  }
}

module.exports = {uploadFileToS3, upload}