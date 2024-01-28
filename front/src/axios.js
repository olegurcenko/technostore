import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://37.1.218.188:4444'
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

