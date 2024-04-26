const passport = require('passport');
const connection = require('../../config/connection');
const logger = require('../../logger/logger');
require('dotenv').config();

let JwtStrategy = require('passport-jwt').Strategy;
// let ExtractJwt = require('passport-jwt').ExtractJwt;

const getToken = (req) => {
    return req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer", "") || null;
}

let opts = {};

// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = getToken;
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        let user = await connection.query('select * from users where id = ?', [jwt_payload.id]);

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(err);
    }
}));



