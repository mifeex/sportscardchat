import instance from './instance';
import hiddenAPI from './hiddenAPI'

export let params = {
	limit: 0,
	page: 1,
	path: '',
	extraPath: ''
}

export const getAPI = {

	postValue: (data, path) => {
		return instance.post(path, {data})
		.then(res => {
			return res.data
		})
	},

	postImage: (data, path) => {
		return instance.post(path, data, {headers: {'content-Type': 'multipart/form-data'}})
		.then(res => {
			return res.data
		})
	},

	getCategory: props => {
		let {limit, page, path, extraPath} = props
		path = 'category/';

		if (limit === 0) {
			limit = 20;
		}

		return hiddenAPI._getLimitedPage(limit, page, path, extraPath)
	},

	getAuth: () => {
		return hiddenAPI._getPage(`auth/me`)
	},

	callMain: () => {
		return hiddenAPI._getPage(``)
	},

	getQueriedParams: param => {
		return hiddenAPI._getPage(param)
	}
}

window.getAPI = getAPI