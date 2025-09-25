// // const cloudinary = require("cloudinary").v2;

// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// // module.exports = cloudinary;



// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

// export default cloudinary;


import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // make sure env is loaded here too

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

console.log("✅ Cloudinary configured:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "set" : "missing",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "set" : "missing",
});

export default cloudinary;
