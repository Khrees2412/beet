const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();
const spotifyApi = require("../spotify");
const { updateAvatar } = require("../controllers/profile");
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
		const tracks = await spotifyApi.getMyRecentlyPlayedTracks({
			limit: 10,
		});

		const data = [];
		tracks.body.items.forEach((item, _) => {
			const { track, played_at } = item;

			const a = track.artists.map((artist) => {
				const _artist = {
					name: artist.name,
					url: artist.href,
				};
				return _artist;
			});
			// console.log(track, new Date().toLocaleString());
			const song = {
				name: track.name,
				artists: a,
				duration_ms: track.duration_ms,
				preview_url: track.preview_url,
				track_url: track.external_urls.spotify,
				played_at: played_at,
			};
			data.push(song);
		});
		res.json({
			data,
		});
	} catch (error) {
		res.json(error);
	}
});
// name, artist, duration, url, artist_url;
// progress_ms,
router.get("/followed-artists", async (req, res) => {
	try {
		const followedArtists = await spotifyApi.getFollowedArtists();
		res.json({
			data: followedArtists.body,
		});
	} catch (error) {
		res.json(error);
	}
});

router.get("/albums", async (req, res) => {
	try {
		const albums = await spotifyApi.getMySavedAlbums();
		res.json({
			data: albums.body,
		});
	} catch (error) {
		res.json(error);
	}
});

router.get("/top-artists", async (req, res) => {
	try {
		const topArtists = await spotifyApi.getMyTopArtists();
		res.json({
			data: topArtists.body,
		});
	} catch (error) {
		res.json(error);
	}
});
router.get("/playlists", async (req, res) => {
	try {
		const playlists = await spotifyApi.getUserPlaylists();
		res.json({
			data: playlists.body,
		});
	} catch (error) {
		res.json(error);
	}
});
router.post(
	"/follow/:id",
	body("").not().isEmpty(),
	param("").not().isEmpty(),
	followUser
);
router.post(
	"/unfollow/:id",
	body("").not().isEmpty(),
	param("").not().isEmpty(),
	unfollowUser
);
router.put("/update-avatar", param("").not().isEmpty(), updateAvatar);

module.exports = router;
