import { emailRegex, nameRegex, mobileRegex, urlRegex } from '../constants.js';

export const isNameValid = (name) => nameRegex.test(name);

export const isEmailValid = (email) => emailRegex.test(email);

export const isMobileValid = (mobile) => mobileRegex.test(mobile);

export const isUrlValid = (url) => urlRegex.test(url);
