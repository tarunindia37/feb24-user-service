import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadCloud = async (file) => {
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

export default uploadCloud;
