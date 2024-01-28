import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://www.technostoreproj.com/api'
	//baseURL: 'http://127.0.0.1:4444/api'
});

instance.interceptors.request.use((config) => {
	config.headers.authorization = window.localStorage.getItem('token');
	return config;
})

export const getBaseUrl = () => {
	return (
		instance.defaults.baseURL
	);
};

export default instance

