import Project from "../models/Project.js";
import User from "../models/User.js"

export const createProject = async (req, res) => {
  try {
    const { title, description, hoursAssigned } = req.body;
    const project = await Project.create({
      title,
      description,
      hoursAssigned,
      createdBy: req.user.id,
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const assignProjectToManagers = async (req, res) => {
//   try {
//     const { projectId, managerIds } = req.body;
//     const project = await Project.findById(projectId);
//     if (!project) return res.status(404).json({ message: "Project not found" });

//     project.assignedManagers = managerIds;
//     await project.save();
//     res.status(200).json(project);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
  

export const assignProjectToManagers = async (req, res) => {
  try {
    const { title, managerNames } = req.body;

    // 1. Find the project by title
    const project = await Project.findOne({ title });
    if (!project) {
      return res.status(404).json({ message: "Project not found by title" });
    }

    // 2. Find users with matching names and role "manager"
    const managers = await User.find({
      name: { $in: managerNames },
      role: "manager",
    });

    if (managers.length === 0) {
      return res.status(404).json({ message: "No matching managers found" });
    }

    // 3. Get their ObjectIds
    const managerIds = managers.map((m) => m._id);

    // 4. Assign managers and save
    project.assignedManagers = managerIds;
    await project.save();

    res.status(200).json({
      message: "Managers assigned successfully ✅",
      project,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};