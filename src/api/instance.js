import * as axios from 'axios';

const instance = axios.create({
	withCredentials: true,
	baseURL: 'http://localhost:4000/',
	headers: {
		'content-Type': undefined
	},
})

export default instance