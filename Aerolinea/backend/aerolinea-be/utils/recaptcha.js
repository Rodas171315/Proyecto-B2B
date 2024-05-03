// src/services/recaptchaService.js
import fetch from "node-fetch";

const RECAPTCHA_SECRET_KEY = '6Lc2g6UpAAAAABCuVezj7jG9eboFnDciYRb--WeN';

export const verifyRecaptcha = async (token) => {
    const url = `https://www.google.com/recaptcha/api/siteverify`;
    const params = new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: token
    });

    const res = await fetch(url, {
        method: 'POST',
        body: params
    });
    const data = await res.json();
    return data.success;
};
