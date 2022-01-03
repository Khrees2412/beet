const spotifyApi = require("../spotify");
const User = require("../models/user");
const scopes = [
	"user-read-playback-state",
	"user-modify-playback-state",
	"user-read-currently-playing",
	"user-read-email",
	"user-read-private",
	"user-library-modify",
	"user-library-read",
	"user-top-read",
	"user-read-playback-position",
	"user-read-recently-played",
	"user-follow-read",
	"user-follow-modify",
	"playlist-modify-public",
	"playlist-read-private",
	"playlist-modify-private",
];

const login = async (req, res) => {
	res.redirect(spotifyApi.createAuthorizeURL(scopes));
};

const callback = async (req, res) => {
	const error = req.query.error;
	const code = req.query.code;
	const state = req.query.state;

	if (error) {
		console.error("Callback Error:", error);
		res.send(`Callback Error: ${error}`);
		return;
	}
	try {
		const data = await spotifyApi.authorizationCodeGrant(code);

		const access_token = data.body["access_token"];
		const refresh_token = data.body["refresh_token"];
		const expires_in = data.body["expires_in"];

		spotifyApi.setAccessToken(access_token);
		spotifyApi.setRefreshToken(refresh_token);

		console.log(
			`Sucessfully retrieved access token. Expires in ${expires_in} s.`
		);

		try {
			const user = await spotifyApi.getMe();
			if (user) {
				storeUser(user);
				const id = user.body.id;
				res.cookie("user_id", id, {
					// expires: 1200,
					maxAge: new Date(Date.now() + 900000),
				});
			}
		} catch (error) {
			console.error(error);
		}

		res.send("Success! You can now close the window.");

		setInterval(async () => {
			const data = await spotifyApi.refreshAccessToken();
			const access_token = data.body["access_token"];

			console.log("The access token has been refreshed!");
			console.log("access_token:", access_token);
			spotifyApi.setAccessToken(access_token);
		}, (expires_in / 2) * 1000);
	} catch (error) {
		console.error("Error getting Tokens:", error);
		res.send(`Error getting Tokens: ${error}`);
	}
};

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
	login,
	callback,
};
