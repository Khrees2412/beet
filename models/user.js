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

module.exports = User;
