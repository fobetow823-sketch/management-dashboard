
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//     role: {
//       type: String,
//       enum: ["admin", "employee", "manager"], // only allowed roles
//       default: "employee", // if not provided
//     },
//       profileImageUrl: {
//       type: String,  // stores Cloudinary URL
//       default: "",   // default empty if no image
//     },
    
//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", userSchema);



import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    role: {
      type: String,
      enum: ["admin", "employee", "manager"], // only allowed roles
      default: "employee", // if not provided
    },
    profileImageUrl: {
      type: String,  
      default: "",   
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    passwordResetExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
