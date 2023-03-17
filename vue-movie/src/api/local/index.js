import axios from 'axios'

function create(baseURL, options) {
  const instance = axios.create(Object.assign({ baseURL }, options))
  return instance
}

export const review = create(`${import.meta.env.VITE_APP_LOCAL_API_URL}/reviews/`)
export const reviewPath = `${import.meta.env.VITE_APP_LOCAL_API_URL}/reviews/`
