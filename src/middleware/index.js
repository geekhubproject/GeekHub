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

function gitNext(nextItems){
	return axios({
		method: 'get',
		url:`${conf.api.base}${conf.api.git.next}/${nextItems}`
	});
}

function mediumNext(nextItems){
	return axios({
		method: 'get',
		url:`${conf.api.base}${conf.api.medium.next}/${nextItems}`
	});
}


export {
	gitFetch,
	mediumFetch,
	gitNext,
	mediumNext
}
