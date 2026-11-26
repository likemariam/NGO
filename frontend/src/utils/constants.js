export const ROLES = {
  ADMIN:        'ADMIN',
  MANAGER:      'MANAGER',
  TEACHER:      'TEACHER',
  FIELD_WORKER: 'FIELD_WORKER',
  REGULAR_USER: 'REGULAR_USER',
  FUNDER:       'FUNDER',
};

// Maps a role string to its dashboard path (matches routes in App.jsx)
export const ROLE_DASHBOARD_MAP = {
  [ROLES.ADMIN]:        '/dashboard/admin',
  [ROLES.MANAGER]:      '/dashboard/manager',
  [ROLES.TEACHER]:      '/dashboard/teacher',
  [ROLES.FIELD_WORKER]: '/dashboard/field-worker',
  [ROLES.REGULAR_USER]: '/dashboard/user',
  [ROLES.FUNDER]:       '/dashboard/funder',
};

export const MATERIAL_TYPES = {
  PDF:      'PDF',
  VIDEO:    'VIDEO',
  DOCUMENT: 'DOCUMENT',
};
