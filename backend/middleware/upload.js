// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require(".//config/cloudinaryConfig");

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "profile_images",
//     allowed_formats: ["jpg", "jpeg", "png"],
//     transformation: [{ width: 500, height: 500, crop: "limit" }],
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;

// Upload.js
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

