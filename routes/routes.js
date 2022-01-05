const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const ensureAuthenticated = require("./middleware");
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
router.get("/currently-playing", ensureAuthenticated, currentlyPlaying);
router.get("/playback", ensureAuthenticated, playback);
router.get("/recently-played", ensureAuthenticated, recentlyPlayed);
router.get("/followed-artists", ensureAuthenticated, followedArtists);
router.get("/albums", ensureAuthenticated, albums);
router.get("/top-artists", ensureAuthenticated, topArtists);
router.get("/top-tracks", ensureAuthenticated, topTracks);
router.get("/playlists", ensureAuthenticated, playlists);

router.post("/add-track", ensureAuthenticated, addToTracks);
router.post("/add-album", ensureAuthenticated, addToAlbums);
router.post("/follow-playlist", ensureAuthenticated, followPlaylist);

// User
router.get("/user", getUser);

router.post(
	"/follow/:id",
	body("").not().isEmpty(),
	param("").not().isEmpty(),
	ensureAuthenticated,
	followUser
);
router.post(
	"/unfollow/:id",
	body("").not().isEmpty(),
	param("").not().isEmpty(),
	ensureAuthenticated,
	unfollowUser
);

//Proflie
router.put(
	"/update-avatar",
	param("").not().isEmpty(),
	ensureAuthenticated,
	updateAvatar
);
router.put(
	"/update-bio",
	param("").not().isEmpty(),
	ensureAuthenticated,
	updateBio
);

module.exports = router;
