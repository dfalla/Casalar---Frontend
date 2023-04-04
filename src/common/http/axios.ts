import Axios, { AxiosRequestConfig, AxiosHeaders } from 'axios';
import { getEnvVariables } from '../helpers';
import { SafeAny } from '../types';

const { VITE_API_URL } = getEnvVariables();

const api = Axios.create({
    baseURL: "http://localhost:8000/api"
    // baseURL: VITE_API_URL
})

api.interceptors.request.use((config) => { 

    if (config && config.headers) { 
        config.headers["x-token"] = localStorage.getItem('token')
    }
    // (config.headers as SafeAny)= {
    //     ...config.headers,
    //     'x-token': localStorage.getItem('token')
    // }

    return config;
})

export default api;