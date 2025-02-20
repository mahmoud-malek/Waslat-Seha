import axios from "axios";

const axiosConfig = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000', // Default to localhost if env variable is not set
});

axiosConfig.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default axiosConfig;