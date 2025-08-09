export const hasPermission = (user, permission) => {
  const permissions = user.permissions;
  return permissions.includes(permission) && user.isActive;
}