const db = require('./schema');
const config = require('../../config');
const uuidv4 = require('uuid/v4');
const hash = require('../common/auth/bcrypt');
const Users = require('./schema');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
	passport.authenticate('local', { session: false },
		(error, user, info) => {
			if (error || !user)
				res.status(400).json(info);
			else{
				const payload = {
					username: user.username,
					expires: Date.now() + config.jwt.expires,
				};

				/** assigns payload to req.user */
				req.login(payload, {session: false}, (error) => {
					if (error) {
						res.status(400).send({error});
					}
					const token = jwt.sign(JSON.stringify(payload), config.jwt.secret);

					/** assign our jwt to the cookie */
					res.cookie('jwt', token, {httpOnly: true, secure: true});
					res.status(200).send({token});
				});
			}
		}
	)(req, res);
};

const profile = (req, res) => {
	const { user } = req;
	res.status(200).send({ user })
};

const register = async (req, res) => {
	try {
		const data = {...req.body};
		const passwordHash = await hash.genHash(data.password);
		const user = new Users({
			username: data.username,
			password: passwordHash,
			email: data.email
		});
		await user.save();
		res.json(data);
	}
	catch (e) {
		console.log(e);
		res.send('form should have all the proerties');
	}
};

module.exports = {
	login,
	profile,
	register
};