import axios from 'axios';

const instance = axios.create({
	//baseURL: 'https://technostoreproj.com/api'
	//baseURL: 'http://127.0.0.1:4444/api'
	baseURL: 'https://technostore-p37h.vercel.app/api'
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

