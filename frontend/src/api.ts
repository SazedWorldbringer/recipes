import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'

export const api = axios.create({ baseURL: BASE_URL })

export const setToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
