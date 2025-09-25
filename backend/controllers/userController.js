// import User from "../models/User.js";
// import bcrypt from "bcryptjs";

// // CREATE USER (Admin only)
// export const createUser = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Forbidden: Only admins can create users" });
//     }

//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Name, email, and password required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: role || "employee",
//     });

//     await newUser.save();

//     res.status(201).json({
//       message: "User created successfully",
//       user: {
//         _id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//         role: newUser.role,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // READ ALL USERS (Admin only)
// export const getUsers = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Forbidden: Only admins can view all users" });
//     }

//     const users = await User.find().select("-password");
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // UPDATE USER (Admin only)
// export const updateUser = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Forbidden: Only admins can update users" });
//     }

//     const { id } = req.params;
//     const { name, email, password, role } = req.body;

//     const user = await User.findById(id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (name) user.name = name;
//     if (email) user.email = email;

//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);
//     }

//     if (role) user.role = role;

//     await user.save();

//     res.json({
//       message: "User updated successfully",
//       user: { _id: user._id, name: user.name, email: user.email, role: user.role },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE USER (Admin only)
// export const deleteUser = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Forbidden: Only admins can delete  users" });
//     }

//     const { id } = req.params;

//     const user = await User.findById(id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     await user.deleteOne();

//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



// // GET ALL EMPLOYEES (Manager )
// export const getEmployees = async (req, res) => {
//   try {
//     if (req.user.role !== "manager" ) {
//       return res.status(403).json({ message: "Forbidden: Only managers  can view employees" });
//     }

//     const employees = await User.find({ role: "employee" }).select("-password");
//     res.json(employees);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



// export const updateProfileImage = async (req, res) => {
//   try {
//     if (!req.file || !req.file.path) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const userId = req.user.id; // assuming verifyToken middleware sets req.user
//     const imageUrl = req.file.path; // this is the Cloudinary URL from multer-storage-cloudinary

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { profileImageUrl: imageUrl },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ message: "Profile image updated", user: updatedUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };


import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ---------------------- CREATE USER (Admin only) ----------------------
export const createUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Only admins can create users" });
    }

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "employee",
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------- GET USERS (Admin only) with search & pagination ----------------------
export const getUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Only admins can view users" });
    }

    let { page = 1, limit = 10, search = "", sortBy = "name", sortOrder = "asc" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    sortOrder = sortOrder === "desc" ? -1 : 1;

    const query = search
      ? { $or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }] }
      : {};

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sortBy]: sortOrder });

    res.json({ users, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------- GET EMPLOYEES (Manager only) with search & pagination ----------------------
export const getEmployees = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ message: "Forbidden: Only managers can view employees" });
    }

    let { page = 1, limit = 10, search = "", sortBy = "name", sortOrder = "asc" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    sortOrder = sortOrder === "desc" ? -1 : 1;

    const query = {
      role: "employee",
      ...(search
        ? { $or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }] }
        : {}),
    };

    const total = await User.countDocuments(query);
    const employees = await User.find(query)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sortBy]: sortOrder });

    res.json({ users: employees, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------- UPDATE USER (Admin only) ----------------------
export const updateUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Only admins can update users" });
    }

    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    if (role) user.role = role;

    await user.save();

    res.json({
      message: "User updated successfully",
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ---------------------- UPDATE PROFILE IMAGE ----------------------
export const updateProfileImage = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.user.id;
    const imageUrl = req.file.path;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImageUrl: imageUrl },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile image updated", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




// DELETE ACCOUNT (email + password)
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id; // from your JWT payload
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Fetch user from DB
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check email matches
    if (user.email !== email) {
      return res.status(400).json({ message: "Email does not match the logged-in user" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Delete user
       await user.deleteOne(); 

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Delete account error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
