import { ROLES } from './constants';

export const can = {
  manageUsers: (role) => role === ROLES.ADMIN,
  manageRoles: (role) => role === ROLES.ADMIN,
  uploadMaterial: (role) => [ROLES.ADMIN, ROLES.TEACHER, ROLES.MANAGER].includes(role),
  createQuiz: (role) => [ROLES.ADMIN, ROLES.TEACHER].includes(role),
  viewAttendanceReports: (role) => [ROLES.ADMIN, ROLES.MANAGER].includes(role),
  viewAllAttendance: (role) => [ROLES.ADMIN, ROLES.MANAGER].includes(role),
  viewFunderProjects: (role) => [ROLES.ADMIN, ROLES.FUNDER].includes(role),
};
