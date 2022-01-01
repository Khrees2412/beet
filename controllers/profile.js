const cloudinary = require("cloudinary").v2;
const User = require("../models/user");
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

const avatar = async (req, res) => {
	// collected image from a user
	const data = {
		image: req.body.image,
	};
	const { id } = req.params;
	try {
		const result = await cloudinary.uploader.upload(data.image);
		await User.findByIdAndUpdate(
			{
				_id: id,
			},
			{
				avatar: result.url,
			}
		);
		res.status(200).send({
			message: "avatar uploaded successfully",
			url: result.url,
		});
	} catch (error) {
		res.status(500).send({
			message: "failed to update avatar",
			error,
		});
	}
};

module.exports = avatar;
