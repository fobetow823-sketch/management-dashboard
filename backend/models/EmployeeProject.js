import mongoose from "mongoose";

const employeeProjectSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // manager
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    hoursWorked: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.EmployeeProject || mongoose.model("EmployeeProject", employeeProjectSchema);
