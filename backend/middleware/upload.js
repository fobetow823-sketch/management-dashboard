
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from '../config/cloudinaryconfig.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_images",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const upload = multer({ storage });

export default upload;

