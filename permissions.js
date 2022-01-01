const READ_PLAYBACK_STATE = "user-read-playback-state";
const MODIFY_PLAYBACK_STATE = "user-modify-playback-state";
const READ_CURRENTLY_PLAYING = "user-read-currently-playing";
const TOP_READ = "user-top-read";
const READ_RECENTLY_PLAYING = "user-read-recently-played";
const Library_READ = "user-library-read";
const PRIVATE_READ = "user-read-private";
const READ_EMAIL = "user-read-email";
const FOLLOW_READ = "user-follow-read";

// ("user-follow-read user-read-currently-playing user-follow-modify user-follow-read user-read-playback-state user-modify-playback-state user-read-email user-read-private user-library-read user-read-recently-played user-top-read");
const getAll = async () => {
	const followedArtists = await spotifyApi.getFollowedArtists({
		after: "2021-08-01",
		limit: 50,
	});
};

// const stateKey = "spotify_auth_state";

// app.get("/login", (req, res) => {
// 	const state = generateRandomString(16);
// 	res.cookie(stateKey, state);

// 	// your application requests authorization
// 	const scope =
// 		"user-follow-read user-read-currently-playing user-follow-modify user-follow-read user-read-playback-state user-modify-playback-state user-read-email user-read-private user-library-read user-read-recently-played user-top-read";

// 	res.redirect(
// 		"https://accounts.spotify.com/authorize?" +
// 			querystring.stringify({
// 				response_type: "code",
// 				client_id: client_id,
// 				scope: scope,
// 				redirect_uri: redirect_uri,
// 				state: state,
// 			})
// 	);
// });

// app.get("/callback", async (req, res) => {
// 	// your application requests refresh and access tokens
// 	// after checking the state parameter

// 	const code = req.query.code || null;
// 	const state = req.query.state || null;
// 	const storedState = req.cookies ? req.cookies[stateKey] : null;

// 	if (state === null || state !== storedState) {
// 		res.redirect(
// 			"/#" +
// 				JSON.stringify({
// 					error: "state_mismatch",
// 				})
// 		);
// 	} else {
// 		res.clearCookie(stateKey);
// 		const authOptions = {
// 			url: "https://accounts.spotify.com/api/token",
// 			form: {
// 				code: code,
// 				redirect_uri: redirect_uri,
// 				grant_type: "authorization_code",
// 			},
// 			headers: {
// 				Authorization:
// 					"Basic " +
// 					new Buffer(client_id + ":" + client_secret).toString(
// 						"base64"
// 					),
// 			},
// 			json: true,
// 		};

// 		try {
// 			const response = await axios.post(authOptions);
// 			const body = response.data;
// 			if (response.statusCode === 200) {
// 				const access_token = body.access_token;
// 				const refresh_token = body.refresh_token;

// 				const options = {
// 					url: "https://api.spotify.com/v1/me",
// 					headers: { Authorization: "Bearer " + access_token },
// 					json: true,
// 				};

// 				// use the access token to access the Spotify Web API
// 				const res = await axios.get(options);

// 				// we can also pass the token to the browser to make requests from there
// 				res.redirect(
// 					"/#" +
// 						JSON.stringify({
// 							access_token: access_token,
// 							refresh_token: refresh_token,
// 						})
// 				);
// 			} else {
// 				res.redirect(
// 					"/#" +
// 						JSON.stringify({
// 							error: "invalid_token",
// 						})
// 				);
// 			}
// 		} catch (error) {
// 			console.error(error);
// 			res.json({
// 				message: " error occurred",
// 				error: error,
// 			});
// 		}
// 	}
// });

// app.get("/refresh_token", async (req, res) => {
// 	// requesting access token from refresh token
// 	const refresh_token = req.query.refresh_token;
// 	const authOptions = {
// 		url: "https://accounts.spotify.com/api/token",
// 		headers: {
// 			Authorization:
// 				"Basic " +
// 				new Buffer(client_id + ":" + client_secret).toString("base64"),
// 		},
// 		form: {
// 			grant_type: "refresh_token",
// 			refresh_token: refresh_token,
// 		},
// 		json: true,
// 	};
// 	try {
// 		const response = await axios.post(authOptions);
// 		if (response.statusCode === 200) {
// 			const access_token = body.access_token;
// 			res.send({
// 				access_token: access_token,
// 			});
// 		}
// 	} catch (error) {
// 		console.error(error);
// 		res.json({
// 			message: " error occurred",
// 			error: error,
// 		});
// 	}
// });
