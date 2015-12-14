commonModule.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});

commonModule.constant('USER_ROLES', {
    ALL: 'all',
    SUPERADMIN: 'sa',
    ADMIN: 'admin',
    CUSTOMER: 'customer'
});
