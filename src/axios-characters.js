import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://rickandmortyapi.com'
});

export default axiosInstance;