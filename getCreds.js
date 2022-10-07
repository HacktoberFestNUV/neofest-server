import dotnev from 'dotenv';
dotnev.config();

export const user = process.env.user;
export const pass = process.env.password;
export const creds = process.env.creds;
