const mongoose = require('mongoose');
const argon2 = require('argon2');

const participantSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [ true, 'Nama depan harus diisi' ],
			minlength: 3,
			maxlength: 50,
		},
		lastName: {
			type: String,
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
			default: '-',
		},
		status: {
			type: String,
			enum: [ 'aktif', 'tidak aktif' ],
			default: 'tidak aktif',
		},
		otp: {
			type: String,
			required: true,
		},
	},
	{timestamps: true}
);

participantSchema.pre('save', async function (next) {
	const User = this;
	if (User.isModified('password')) {
		User.password = await argon2.hash(User.password);
	}
	next();
});

participantSchema.methods.comparePassword = async function (candidatePassword) {
	const isMatch = await argon2.verify(this.password, candidatePassword);
	return isMatch;
};

module.exports = mongoose.model('Participant', participantSchema);
