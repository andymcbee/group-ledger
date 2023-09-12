export const userPermissions = {
  Admin: { Admin: true, User: true, "Read Only": true },
  User: { Admin: false, User: true, "Read Only": true },
  "Read Only": { Admin: false, User: false, "Read Only": true },
};
