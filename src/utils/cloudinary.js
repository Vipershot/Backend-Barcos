const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRECT,
});

const uploadImage = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath);
  return result;
};

module.exports = { cloudinary, uploadImage };
