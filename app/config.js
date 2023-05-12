const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	urlDb: process.env.URL_MONGODB_DEV,
	jwtSecret: process.env.JWT_SECRET,
	jwtRefreshTokenSecret: process.env.JWT_SECRET_REFRESH_TOKEN,
	jwtExpiration: '24h',
	jwtRefreshTokenExpiration: '2d',
	gmail: process.env.GMAIL,
	password: process.env.PASSWORD,
};