import axios from "axios";

function create(detailURL = '') {
    const apiURL = (import.meta.env.VITE_APP_API_URL) + detailURL;
    const options = {
        api_key: import.meta.env.VITE_APP_API_KEY,
        language: import.meta.env.VITE_APP_API_LANGUAGE,
    }

    const instance = axios.create({
        baseURL: apiURL,
        params: {
            ...options
        }
    })
    return instance;
}

export const baseAPI = create();
export const discoverAPI = create('discover');
export const movieAPI = create('movie');
export const tvAPI = create('tv');
export const searchAPI = create('search');
export const gerenAPI = create('genre');
export const trendingAPI = create('trending')
export const keywordAPI = create('keyword')