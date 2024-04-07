import { v2 as cloudinary } from 'cloudinary';
import { pathRegex } from '../constants.js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadCloud = async (file) => {
  return new Promise((resolve, reject) => {
    // Upload file to Cloudinary
    cloudinary.uploader.upload(file, (error, result) => {
      if (error) {
        console.error('Error uploading file to Cloudinary: ', error);
        reject(error);
      }
      // Send Cloudinary URL back to client
      resolve(result.secure_url);
    });
  });
};

export const deleteFromCloud = async (fileUrl) => {
  try {
    const match = fileUrl.match(pathRegex);
    if (match && match.length > 1) {
      const fileName = match[1];
      if (fileName) {
        // Call Cloudinary's destroy method to delete the image
        const result = await cloudinary.uploader.destroy(fileName);
        return result;
      }
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    return null;
  }
};
