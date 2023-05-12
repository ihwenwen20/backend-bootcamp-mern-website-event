const Images = require('../../api/v1/images/model');
const { NotFoundError } = require('../../errors');

/**
 * Umumnya kita bisa gunakan 2 cara untuk menangani file atau images
 * 1. Kita gunakan cara seperti yang kita lakukan dibawah, kita create dulu images nya.
 * Setelah kita create imagesnya kita bakal dapat url nya.
 * Nah, url inilah yang kita bakal masukin ke dalam si image referensi nya, contoh kasus kita pada talent nya
 * 2. Kita generate url setelah submit dari frontend, baru kita simpan images nya ke database.
 */
// cara 1
const createImages = async (req) => {
	const result = await Images.create({
		name: req.file
			? `uploads/${req.file.filename}`
			: 'uploads/avatar/default.jpeg',
	});

	return result;
};

// 2. Cara 2
// const generateUrlImages = async (req) => {
// 	const result = `uploads/${req.file.filename}`;

// 	return result;
// };
// module.exports = {createImages, generateUrlImages};

// tambahkan function checking Image
const checkingImage = async (id) => {
	const result = await Images.findOne({_id: id});
	console.log(result);

	if (!result) throw new NotFoundError(`Tidak ada Gambar dengan id :  ${id}`);

	return result;
};
// jangan lupa export checkingImage
module.exports = {createImages, checkingImage};