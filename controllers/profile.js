const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;
const User = require("../models/user");
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

const updateAvatar = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({
			success: false,
			message: "The request contains invalid or incomplete fields ",
		});
	}
	// collected image from a user
	const data = {
		image: req.body.image,
	};
	const id = req.cookie["user_id"];
	try {
		const { url } = await cloudinary.uploader.upload(data.image);
		await User.findByIdAndUpdate(
			{ user_id: id },
			{
				avatar: url,
			}
		);
		res.status(200).json({
			message: "avatar uploaded successfully",
			data: url,
		});
	} catch (error) {
		res.status(500).json({
			message: "failed to update avatar",
			error,
		});
	}
};
const updateBio = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({
			success: false,
			message: "The request contains invalid or incomplete fields ",
		});
	}
	const id = req.cookie["user_id"];
	try {
		const { about, genres } = req.body.bio;
		const user = await User.find({ user_id: id });
		user.about = about;
		user.genres.push(genres);
		await User.findByIdAndUpdate(
			{ user_id: id },
			{ $addToSet: { followers: followerID } }
			// { $push: { followers: userID } }
		);
	} catch (error) {
		res.status(500).json({
			message: "Error occurred while updating bio",
			error,
		});
	}
};
module.exports = { updateAvatar, updateBio };
