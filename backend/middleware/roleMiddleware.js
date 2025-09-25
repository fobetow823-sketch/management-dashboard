/**
 * Role-based access control middleware
 * @param {Array} allowedRoles - array of allowed roles, e.g., ["admin", "manager"]
 */
export const roleMiddleware = (allowedRoles = ["admin","manager","employee"]) => {
  return (req, res, next) => {
    // req.user should already be set by authMiddleware
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient permissions" });
    }

    next();
  };
};
