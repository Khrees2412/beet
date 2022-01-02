const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();
const { updateAvatar } = require("../controllers/profile");
const { followUser, unfollowUser } = require("../controllers/follow");
const {
	recentlyPlayed,
	albums,
	playlists,
	followedArtists,
	topArtists,
	currentlyPlaying,
} = require("../controllers/spotify");

router.get("/user", async (req, res) => {
	try {
	} catch (error) {}
});

// progress_ms,
router.get("/currently-playing", currentlyPlaying);
router.get("/recently-played", recentlyPlayed);
router.get("/followed-artists", followedArtists);
router.get("/albums", albums);
router.get("/top-artists", topArtists);
router.get("/playlists", playlists);
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
//  {
//     "timestamp": 1641155699430,
//     "context": {
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/4NVQYA4NSrRgVuV9REZf3c"
//       },
//       "href": "https://api.spotify.com/v1/playlists/4NVQYA4NSrRgVuV9REZf3c",
//       "type": "playlist",
//       "uri": "spotify:playlist:4NVQYA4NSrRgVuV9REZf3c"
//     },
//     "progress_ms": 18939,
//     "item": {
//       "album": {
//         "album_type": "single",
//         "artists": [
//           {
//             "external_urls": {
//               "spotify": "https://open.spotify.com/artist/1McMsnEElThX1knmY4oliG"
//             },
//             "href": "https://api.spotify.com/v1/artists/1McMsnEElThX1knmY4oliG",
//             "id": "1McMsnEElThX1knmY4oliG",
//             "name": "Olivia Rodrigo",
//             "type": "artist",
//             "uri": "spotify:artist:1McMsnEElThX1knmY4oliG"
//           }
//         ],
//         "available_markets": [
//           "AD",
//         ],
//         "external_urls": {
//           "spotify": "https://open.spotify.com/album/2VcY9Ks3xBxPSSWESzhCYu"
//         },
//         "href": "https://api.spotify.com/v1/albums/2VcY9Ks3xBxPSSWESzhCYu",
//         "id": "2VcY9Ks3xBxPSSWESzhCYu",
//         "images": [
//           {
//             "height": 640,
//             "url": "https://i.scdn.co/image/ab67616d0000b273b7938233b4cdb26a34fe193c",
//             "width": 640
//           },
//           {
//             "height": 300,
//             "url": "https://i.scdn.co/image/ab67616d00001e02b7938233b4cdb26a34fe193c",
//             "width": 300
//           },
//           {
//             "height": 64,
//             "url": "https://i.scdn.co/image/ab67616d00004851b7938233b4cdb26a34fe193c",
//             "width": 64
//           }
//         ],
//         "name": "All I Want (Love That Lasts Mix)",
//         "release_date": "2020-05-22",
//         "release_date_precision": "day",
//         "total_tracks": 1,
//         "type": "album",
//         "uri": "spotify:album:2VcY9Ks3xBxPSSWESzhCYu"
//       },
//       "artists": [
//         {
//           "external_urls": {
//             "spotify": "https://open.spotify.com/artist/1McMsnEElThX1knmY4oliG"
//           },
//           "href": "https://api.spotify.com/v1/artists/1McMsnEElThX1knmY4oliG",
//           "id": "1McMsnEElThX1knmY4oliG",
//           "name": "Olivia Rodrigo",
//           "type": "artist",
//           "uri": "spotify:artist:1McMsnEElThX1knmY4oliG"
//         }
//       ],
//       "available_markets": [
//         "AD",

//       ],
//       "disc_number": 1,
//       "duration_ms": 175388,
//       "explicit": false,
//       "external_ids": {
//         "isrc": "USWD12096558"
//       },
//       "external_urls": {
//         "spotify": "https://open.spotify.com/track/05ZA9WD25P4ynY41Bd15Km"
//       },
//       "href": "https://api.spotify.com/v1/tracks/05ZA9WD25P4ynY41Bd15Km",
//       "id": "05ZA9WD25P4ynY41Bd15Km",
//       "is_local": false,
//       "name": "All I Want - Love That Lasts Mix",
//       "popularity": 64,
//       "preview_url": "https://p.scdn.co/mp3-preview/b1b61883a537f87012b4cba24fc401c57b4dd690?cid=dd1a9ad2e7a94f48987e5f025acc9279",
//       "track_number": 1,
//       "type": "track",
//       "uri": "spotify:track:05ZA9WD25P4ynY41Bd15Km"
//     },
//     "currently_playing_type": "track",
//     "actions": {
//       "disallows": {
//         "resuming": true
//       }
//     },
//     "is_playing": true
//   }
