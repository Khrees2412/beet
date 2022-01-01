const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
	},
	display_name: {
		type: String,
		unique: true,
	},
	profile_link: {
		type: String,
		unique: true,
	},
	profile_picture: {
		type: String,
	},
	followers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

const User = mongoose.model("User", UserSchema);

const storeUser = async (newUser) => {
	try {
		const { email, display_name, href, images } = newUser.body;
		const profile_picture = images[0].url;
		const profile_link = href;
		const existing = await User.find({
			email,
		});

		if (!existing.length > 0) {
			const user = new User({
				email,
				display_name,
				profile_link,
				profile_picture,
			});
			await user.save();
			console.log("new user saved");
		} else {
			console.log("user exists already");
		}
	} catch (error) {
		console.log(error);
	}
};

const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.find({ _id: id });
		if (user) {
			res.status(200).json({
				success: true,
				message: "User details found",
				data: user,
			});
		}
	} catch (error) {
		res.status(500).json({
			success: true,
			message: "An error occurred while trying to get user details",
			error,
		});
	}
};

module.exports = {
	User,
	storeUser,
	getUser,
};

//  country: 'NG',
//       display_name: 'mockingjay',
//       email: 'christiannduh@gmail.com',
//       explicit_content: [Object],
//       external_urls: [Object],
//       followers: [Object],
//       href: 'https://api.spotify.com/v1/users/31imiso5jpcqayh2wwkkzsqoygc4',
//       id: '31imiso5jpcqayh2wwkkzsqoygc4',
//       images: [Array],
//       product: 'premium',
//       type: 'user',
//       uri: 'spotify:user:31imiso5jpcqayh2wwkkzsqoygc4'
