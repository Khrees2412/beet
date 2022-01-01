const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/config");
const routes = require("./routes/routes");

dotenv.config();
const app = express();

const spotifyApi = require("./spotify");
const { storeUser } = require("./models/user");
const scopes = [
	"user-read-playback-state",
	"user-modify-playback-state",
	"user-read-currently-playing",
	"user-read-email",
	"user-read-private",
	"playlist-modify-public",
	"playlist-read-private",
	"playlist-modify-private",
	"user-library-modify",
	"user-library-read",
	"user-top-read",
	"user-read-playback-position",
	"user-read-recently-played",
	"user-follow-read",
	"user-follow-modify",
];
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", routes);

app.get("/login", (req, res) => {
	res.redirect(spotifyApi.createAuthorizeURL(scopes));
});
app.get("/", (req, res) => {
	res.send("<h1>Home</h1>");
});
app.get("/callback", async (req, res) => {
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
});

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
	console.log(`server started at port ${PORT}`);
});
