import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import crypto from "crypto";
import transporter from '../config/emailConfig.js'


// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Prevent registering as admin
    if (role === "admin") {
      return res.status(400).json({ message: "Cannot register as Admin" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "employee", // default if not provided
    });
    await newUser.save();

    // Create JWT with role
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // JWT includes role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful 🎉",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // include role in response
        profileImageUrl: user.profileImageUrl,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// //forgot password
// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const resetToken = crypto.randomBytes(32).toString("hex");

//     user.passwordResetToken = resetToken;
//     user.passwordResetExpires = Date.now() + 3600000; // 1 hour
//     await user.save();

//     const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

//     const message = `
//       <h3>Password Reset</h3>
//       <p>Click this link to reset your password:</p>
//       <a href="${resetUrl}">${resetUrl}</a>
//     `;

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: "Password Reset",
//       html: message,
//     });

//     res.json({ message: "Password reset email sent" });
//   } catch (error) {
//     res.status(500).json({ message: "Error sending reset email" });
//   }
// };


// // reset password
// export const resetPassword = async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   try {
//     const user = await User.findOne({
//       passwordResetToken: token,
//       passwordResetExpires: { $gt: Date.now() },
//     });

//     if (!user) return res.status(400).json({ message: "Invalid or expired token" });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     user.passwordResetToken = null;
//     user.passwordResetExpires = null;

//     await user.save();

//     res.json({ message: "Password reset successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error resetting password" });
//   }
// };


// forgotPassword
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate raw reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash it before saving
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send raw token in email link
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `
      <h3>Password Reset</h3>
      <p>Click this link to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      html: message,
    });

    res.json({ message: "Password reset email sent" });
  } catch (error) {
  console.error("Forgot password error:", error);
  res.status(500).json({ message: "Error sending reset email", error: error.message });
}
};

 
// resetPassword
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Hash token before lookup
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Clear reset fields
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({ message: "Error resetting password" });
  }
};


