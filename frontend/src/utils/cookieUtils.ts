// cookieUtils.ts
import Cookies from 'js-cookie';

const TOKEN_KEY = 'your_token_key_here';

export const setTokenInCookie = (token: string) => {
  // กำหนดเวลาหมดอายุของ Cookies (หน่วยคือ วินาที)
  const expirationTimeInSeconds = 20; // 1 ชม.

  // เก็บ token ใน Cookies โดยกำหนดเวลาหมดอายุ
  Cookies.set(TOKEN_KEY, token, { expires: expirationTimeInSeconds });
};

export const getTokenFromCookie = (): string | null => {
  return Cookies.get(TOKEN_KEY) || null;
};

export const removeTokenFromCookie = () => {
  Cookies.remove(TOKEN_KEY);
};
