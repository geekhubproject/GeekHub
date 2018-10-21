const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const cofig = require('../../../config/');

passport.use(new JWTStrategy({
	jwtFromRequest: req => req.cookies.jwt,
	secretOrKey: cofig.jwt.secret,
},
(jwtPayload, done) => {
	if (jwtPayload.expires > Date.now()) {
		return done('jwt expired');
	}
	return done(null, jwtPayload);
}
));