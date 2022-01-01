const express = require("express");
const router = express.Router();
const spotifyApi = require("../spotify");
const { followUser, unfollowUser } = require("../controllers/follow");

router.get("/user", async (req, res) => {
	try {
	} catch (error) {}
});

router.get("/currently-playing", async (req, res) => {
	try {
		const track = await spotifyApi.getMyCurrentPlayingTrack();
		res.json(track.body);
	} catch (error) {
		res.json(error);
	}
});
router.get("/recently-played", async (req, res) => {
	try {
		const { limit, after, before } = req.body;
		const track = await spotifyApi.getMyRecentlyPlayedTracks({
			limit: 20,
		});
		res.json({
			track: track.body,
		});
		spotifyApi.getMySavedAlbums();
	} catch (error) {
		res.json(error);
	}
});

router.get("/followed-artists", async (req, res) => {
	try {
		const followedArtists = await spotifyApi.getFollowedArtists();
		res.json({
			followedArtists: followedArtists.body,
		});
	} catch (error) {
		res.json(error);
	}
});

router.get("/albums", async (req, res) => {
	try {
		const albums = await spotifyApi.getMySavedAlbums();
		res.json({
			albums,
		});
	} catch (error) {
		res.json(error);
	}
});

router.get("/top-artists", async (req, res) => {
	try {
		const topArtists = await spotifyApi.getMyTopArtists();
		res.json({
			topArtists: topArtists.body,
		});
	} catch (error) {
		res.json(error);
	}
});
router.get("/playlists", async (req, res) => {
	try {
		const playlists = await spotifyApi.getUserPlaylists();
		res.json({
			playlists,
		});
	} catch (error) {
		res.json(error);
	}
});
router.post("/follow/:id", followUser);
router.post("/unfollow/:id", unfollowUser);

module.exports = router;
