import axios from 'axios';
import conf from '../config';

const gitFetch = () => {
	return axios({
		method: 'get',
		url:`${conf.api.base}${conf.api.git.top}`
	});
};

const mediumFetch = () => {
	return axios({
		method: 'get',
		url:`${conf.api.base}${conf.api.medium.top}`
	});
};

const gitNext = () => {
	return axios({
		method: 'get',
		url:`${conf.api.base}${conf.api.git.next}`
	});
};

const mediumNext = () => {
	return axios({
		method: 'get',
		url:`${conf.api.base}${conf.api.medium.next}`
	});
};


export {
	gitFetch,
	mediumFetch,
	gitNext,
	mediumNext
}
