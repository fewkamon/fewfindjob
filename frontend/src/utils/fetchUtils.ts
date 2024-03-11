// utils/fetchUtils.ts
import { setTokenInCookie, getTokenFromCookie } from './cookieUtils';

const BASE_URL = process.env.BACKEND_URL;

const fetchWithToken = async (url: string, options: RequestInit = {}, revalidate: number) => {
    const token = getTokenFromCookie();
    options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
    };
    if (token) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    options.next = { revalidate: revalidate }

    const response = await fetch(`${BASE_URL}${url}`, options);

    if (response.status === 401) {
        options.headers = {
            ...options.headers,
            Authorization: "",
        };
    }

    return response;
};


export const fetchUploadWithToken = async (url: string, options: RequestInit = {}, revalidate: number) => {
    const token = getTokenFromCookie();
  
    if (token) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    options.next = { revalidate: revalidate }

    const response = await fetch(`${BASE_URL}${url}`, options);

    if (response.status === 401) {
        options.headers = {
            ...options.headers,
            Authorization: "",
        };
    }

    return response;
};


export default fetchWithToken;
