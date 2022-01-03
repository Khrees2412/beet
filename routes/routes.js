const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const { updateAvatar, updateBio } = require("../controllers/profile");
const { followUser, unfollowUser } = require("../controllers/network");
const {
	recentlyPlayed,
	albums,
	playlists,
	followedArtists,
	topArtists,
	currentlyPlaying,
	playback,
	topTracks,
} = require("../controllers/spotify");
const { login, callback } = require("../controllers/user");

router.get("/user", async (req, res) => {
	try {
	} catch (error) {}
});

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

// Network
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
