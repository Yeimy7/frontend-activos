import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

export default clienteAxios