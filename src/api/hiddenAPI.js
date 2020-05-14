import instance from './instance';

const hiddenAPI = {
	_getLimitedPage: (limit, page, path, extraPath = '', additionalQuery = '') => {
		return instance.get(`${path}${extraPath}?limit=${limit}&page=${page}${additionalQuery}`)
		.then(res => {
			return res.data
		})
	},

	_getPage: path => {
		return instance.get(path)
		.then(res => {
			return res.data
		})
	},
}

export default hiddenAPI