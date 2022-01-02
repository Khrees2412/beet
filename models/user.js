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
	avatar: {
		type: String,
	},
	about: {
		type: String,
		default: "",
		maxLength: 75,
	},
	genres: [
		{
			type: String,
		},
	],
	followers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

UserSchema.path("genres").validate((value) => {
	if (value.length > 5) {
		throw new Error("Genres' size can't be greater than 5!");
	}
});

const User = mongoose.model("User", UserSchema);

const storeUser = async (newUser) => {
	try {
		const { email, display_name, href, images } = newUser.body;
		const avatar = images[0].url;
		const profile_link = href;
		const existing = await User.find({
			email,
		});

		if (!existing.length > 0) {
			const user = new User({
				email,
				display_name,
				profile_link,
				avatar,
			});
			await user.save();
			const u = getUser(email);
			console.log("new user saved");
			return u._id;
		} else {
			console.log("user exists already");
			return;
		}
	} catch (error) {
		console.log(error);
	}
};

const getUser = async (email) => {
	try {
		const user = await User.find({ email });
		if (user) {
			return user;
		}
	} catch (error) {
		throw new Error(error);
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
