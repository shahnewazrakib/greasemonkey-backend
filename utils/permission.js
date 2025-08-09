// Admin permissions
export const adminPermissions = [
  // Overview
  "read:overview",

  // inspector
  "create:inspector",
  "read:inspector",
  "update:inspector",
  "delete:inspector",

  // Report
  "create:report",
  "read:report",
  "update:report",
  "assign:report",
  "delete:report",

  // Profile
  "update:profile",
];

// Inspector permissions
export const inspectorPermissions = [
  // Overview
  "read:overview",

  // Report
  "read:report",
  "update:report",

  // profile
  "update:profile",
];
