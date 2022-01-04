const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const { updateAvatar, updateBio } = require("../controllers/profile");
const { followUser, unfollowUser, getUser } = require("../controllers/user");
const {
	recentlyPlayed,
	albums,
	playlists,
	followedArtists,
	topArtists,
	currentlyPlaying,
	playback,
	topTracks,
	addToTracks,
	addToAlbums,
	followPlaylist,
} = require("../controllers/spotify");
const { login, callback } = require("../controllers/auth");

//Auth
router.get("/login", login);
router.get("/callback", callback);

//Spotify
router.get("/currently-playing", currentlyPlaying);
router.get("/playback", playback);
router.get("/recently-played", recentlyPlayed);
router.get("/followed-artists", followedArtists);
router.get("/albums", albums);
router.get("/top-artists", topArtists);
router.get("/top-tracks", topTracks);
router.get("/playlists", playlists);

router.post("/add-track", addToTracks);
router.post("/add-album", addToAlbums);
router.post("/follow-playlist", followPlaylist);

// User
router.get("/user", getUser);

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

//Proflie
router.put("/update-avatar", param("").not().isEmpty(), updateAvatar);
router.put("/update-bio", param("").not().isEmpty(), updateBio);

module.exports = router;
