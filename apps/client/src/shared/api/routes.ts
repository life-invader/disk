export const apiRoutes = {
  auth: {
    register: '/auth/register',
    check: '/auth/check',
    login: '/auth/login',
    logout: '/auth/logout',
  },
  user: {
    me: '/user/me',
  },
} as const