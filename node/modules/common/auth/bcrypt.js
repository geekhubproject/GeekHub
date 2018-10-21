const bcrypt = require('bcrypt');
const saltRounds = 10; // Hash cost higher the cost height the security and time/compute costly

const genHash = (password, saltRounds=10) => new Promise((resolve, reject) => {
	bcrypt.hash(password, saltRounds)
		.then(res =>  resolve(res))
		.catch(e => reject(e));
});

const verifyHash = (password, hash) => new Promise((resolve, reject) => {
	console.log(password, hash);
	bcrypt.compare(password, hash)
		.then(res => resolve(res))
		.catch(e => reject(e));
});

module.exports = {
	genHash,
	verifyHash
};