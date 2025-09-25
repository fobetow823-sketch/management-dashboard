import EmployeeProject from "../models/EmployeeProject.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

// export const assignProjectToEmployees = async (req, res) => {
//   try {
//     const { projectId, employeeIds } = req.body;
//     const assignments = employeeIds.map(empId => ({
//       projectId,
//       employeeId: empId,
//       assignedBy: req.user.id,
//     }));
//     const createdAssignments = await EmployeeProject.insertMany(assignments);
//     res.status(201).json(createdAssignments);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const assignProjectToEmployees = async (req, res) => {
  try {
    const { title, employeeNames } = req.body;

    // 1. Find the project by title
    const project = await Project.findOne({ title });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 2. Find employees by name
    const employees = await User.find({
      name: { $in: employeeNames },
      role: "employee",
    });

    if (employees.length === 0) {
      return res.status(404).json({ message: "No matching employees found" });
    }

    // 3. Prepare assignments
    const assignments = employees.map(emp => ({
      projectId: project._id,
      employeeId: emp._id,
      assignedBy: req.user.id, // assuming req.user is set by verifyToken middleware
    }));

    // 4. Save assignments
    const createdAssignments = await EmployeeProject.insertMany(assignments);

    res.status(201).json(createdAssignments);
  } catch (err) {
    console.error("Assign employees error:", err);
    res.status(500).json({ message: err.message || "Failed to assign employees" });
  }
};



// export const updateProjectStatus = async (req, res) => {
//   try {
//     const { assignmentId, status, hoursWorked } = req.body;
//     const assignment = await EmployeeProject.findById(assignmentId);
//     if (!assignment) return res.status(404).json({ message: "Assignment not found" });

//     assignment.status = status ?? assignment.status;
//     assignment.hoursWorked = hoursWorked ?? assignment.hoursWorked;
//     await assignment.save();
//     res.status(200).json(assignment);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


export const updateProjectStatus = async (req, res) => {
  try {
    const { title, status, hoursWorked } = req.body;

    // 1. Get employee from token
    const employeeId = req.user.id;

    // 2. Find the project by title
    const project = await Project.findOne({ title });
    if (!project) return res.status(404).json({ message: "Project not found" });

    // 3. Find the assignment
    const assignment = await EmployeeProject.findOne({
      projectId: project._id,
      employeeId: employeeId,
    });

    if (!assignment) return res.status(404).json({ message: "Assignment not found for this user and project" });

    // 4. Update assignment
    assignment.status = status ?? assignment.status;
    assignment.hoursWorked = hoursWorked ?? assignment.hoursWorked;
    await assignment.save();

    res.status(200).json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





export const getAllProjectsStatus = async (req, res) => {
  try {
    const data = await EmployeeProject.find()
      .populate("projectId", "title description hoursAssigned")
      .populate("employeeId", "name email")
      .populate("assignedBy", "name email");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
