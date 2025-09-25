// // import nodemailer from 'nodemailer';


// // console.log("EMAIL_HOST:", process.env.EMAIL_HOST);   // ✅ Add here
// // console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
// // console.log("EMAIL_USER:", process.env.EMAIL_USER);


// // const transporter = nodemailer.createTransport({
// //   host: process.env.EMAIL_HOST,     
// //  port: Number(process.env.EMAIL_PORT),     
// //   secure: process.env.EMAIL_SECURE === 'false',  
// //   auth: {
// //     user: process.env.EMAIL_USER,   
// //     pass: process.env.EMAIL_PASS,   
// //   },
// // });

// // export default transporter;


 import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: Number(process.env.EMAIL_PORT),           // important: convert to number
//   secure: process.env.EMAIL_SECURE === "true",    // important: boolean
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// transporter.verify((err, success) => {
//   if (err) console.error("SMTP connection error:", err);
//   else console.log("✅ SMTP server is ready to send emails");
// });

// export default transporter;

import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),          // convert to number
  secure: process.env.EMAIL_SECURE === "true",   // boolean
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) console.error("SMTP connection error:", err);
  else console.log("✅ SMTP server is ready to send emails");
});

export default transporter;
