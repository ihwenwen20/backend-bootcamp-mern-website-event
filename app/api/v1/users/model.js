const mongoose = require('mongoose');
const argon2 = require('argon2');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [ true, 'Nama harus diisi' ],
			minlength: 3,
			maxlength: 50,
		},
		email: {
			type: String,
			unique: true,
			required: [ true, 'Email harus diisi' ],
		},
		password: {
			type: String,
			required: [ true, 'Password harus diisi' ],
			minlength: 6,
		},
		role: {
			type: String,
			enum: [ 'Admin', 'Organizer', 'Owner' ],
			default: 'Admin',
		},
		organizer: {
			type: mongoose.Types.ObjectId,
			ref: 'Organizer',
			required: true,
		},
	},
	{timestamps: true}
);

userSchema.pre('save', async function (next) {
	const User = this;
	if (User.isModified('password')) {
		// try {
		// 	const hashedPassword = await argon2.hash(user.password);
		// 	user.password = hashedPassword;
		// } catch (error) {
		// 	throw new Error('Gagal mengenkripsi password');
		// }
		User.password = await argon2.hash(User.password);
	}
	next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
	try {
		const isMatch = await argon2.verify(this.password, candidatePassword);
		return isMatch;
	} catch (error) {
		throw new Error('Gagal membandingkan password');
	}
};

module.exports = mongoose.model('User', userSchema);