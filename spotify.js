const SpotifyWebApi = require("spotify-web-api-node");

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = "http://localhost:5000/api/v1/callback";
// credentials are optional
const spotifyApi = new SpotifyWebApi({
	clientId: client_id,
	clientSecret: client_secret,
	redirectUri: redirect_uri,
});

module.exports = spotifyApi;
