const User = require("../models/user");

const followUser = async (req, res) => {
	try {
		const followerID = req.params.id;
		const id = req.body.id;
		// user.followers.push(userID);

		// user.save();
		const user = User.find({ id });
		if (user) {
			await User.findByIdAndUpdate(
				{ _id: id },
				{ $addToSet: { followers: followerID } }
				// { $push: { followers: userID } }
			);
		}
	} catch (error) {
		res.json(error);
	}
};

const unfollowUser = async (req, res) => {
	try {
		const followerID = req.params.id;
		const id = req.body.id;

		// const user = User.find({ id });
		// user.followers.pull(followerID)
		// user.save()
		await User.findByIdAndUpdate(
			{ _id: id },
			{ $pull: { followers: followerID } }
			// { $push: { followers: followerID } }
		);
	} catch (error) {
		res.json(error);
	}
};
module.exports = {
	followUser,
	unfollowUser,
};