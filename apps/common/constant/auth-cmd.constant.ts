export const AUTH_COMMANDS = {
    AUTH_FIND_ALL : 'auth_find_all',
    AUTH_LOGIN : 'auth_login',
    AUTH_SIGN_UP: 'auth_sign_up',
    AUTH_MODIFY_ROLE: 'auth_modify_role'
} as const;

export type AuthCommand = typeof AUTH_COMMANDS[keyof typeof AUTH_COMMANDS];