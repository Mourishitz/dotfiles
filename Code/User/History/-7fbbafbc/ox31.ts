// Copy this file into config.ts to configure environment variables.

export const JWT_SECRET = 'jwtSecret';
export const PASSWORD_SALT = 10;
export const DEFAULT_EXPIRATION_DAY = 31;
export const DEFAULT_EXPIRATION_MONTH = 3; // March
export const MEMORY_LIMIT = 500; // memory limit for health check in mb
export const OS_PATH = '/'; // 'C:\\' for windows and '/' for linux
export const FONTS = {  // Global fonts installed in shared folder
	Roboto: {
		italics: './shared/fonts/Roboto-Italic.ttf',
	}
};