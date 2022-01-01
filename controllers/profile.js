const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;
const User = require("../models/user");
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

const updateAvatar = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({
			success: false,
			message: "The request contains invalid or incomplete fields ",
		});
	}
	// collected image from a user
	const data = {
		image: req.body.image,
	};
	const { id } = req.params;
	try {
		const { url } = await cloudinary.uploader.upload(data.image);
		await User.findByIdAndUpdate(
			{
				_id: id,
			},
			{
				avatar: url,
			}
		);
		res.status(200).json({
			message: "avatar uploaded successfully",
			data: url,
		});
	} catch (error) {
		res.status(500).json({
			message: "failed to update avatar",
			error,
		});
	}
};
const updateBio = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({
			success: false,
			message: "The request contains invalid or incomplete fields ",
		});
	}
	try {
		const { about, genres } = req.body.bio;
		const user = await User.find({ _id: id });
		user.about = about;
		user.genres.push(genres);
		await User.findByIdAndUpdate(
			{ _id: id },
			{ $addToSet: { followers: followerID } }
			// { $push: { followers: userID } }
		);
	} catch (error) {
		res.status(500).json({
			message: "Error occurred while updating bio",
			error,
		});
	}
};
module.exports = { updateAvatar, updateBio };

//  [
//       {
//         "track": {
//           "album": {
//             "album_type": "album",
//             "artists": [
//               {
//                 "external_urls": {
//                   "spotify": "https://open.spotify.com/artist/5Pwc4xIPtQLFEnJriah9YJ"
//                 },
//                 "href": "https://api.spotify.com/v1/artists/5Pwc4xIPtQLFEnJriah9YJ",
//                 "id": "5Pwc4xIPtQLFEnJriah9YJ",
//                 "name": "OneRepublic",
//                 "type": "artist",
//                 "uri": "spotify:artist:5Pwc4xIPtQLFEnJriah9YJ"
//               }
//             ],
//             "available_markets": [
//               "SG",
//             ],
//             "external_urls": {
//               "spotify": "https://open.spotify.com/album/20lOt6G8MHv8ZO7ViOmiP7"
//             },
//             "href": "https://api.spotify.com/v1/albums/20lOt6G8MHv8ZO7ViOmiP7",
//             "id": "20lOt6G8MHv8ZO7ViOmiP7",
//             "images": [
//               {
//                 "height": 640,
//                 "url": "https://i.scdn.co/image/ab67616d0000b2739e2f95ae77cf436017ada9cb",
//                 "width": 640
//               },
//               {
//                 "height": 300,
//                 "url": "https://i.scdn.co/image/ab67616d00001e029e2f95ae77cf436017ada9cb",
//                 "width": 300
//               },
//               {
//                 "height": 64,
//                 "url": "https://i.scdn.co/image/ab67616d000048519e2f95ae77cf436017ada9cb",
//                 "width": 64
//               }
//             ],
//             "name": "Native",
//             "release_date": "2013-01-01",
//             "release_date_precision": "day",
//             "total_tracks": 12,
//             "type": "album",
//             "uri": "spotify:album:20lOt6G8MHv8ZO7ViOmiP7"
//           },
//           "artists": [
//             {
//               "external_urls": {
//                 "spotify": "https://open.spotify.com/artist/5Pwc4xIPtQLFEnJriah9YJ"
//               },
//               "href": "https://api.spotify.com/v1/artists/5Pwc4xIPtQLFEnJriah9YJ",
//               "id": "5Pwc4xIPtQLFEnJriah9YJ",
//               "name": "OneRepublic",
//               "type": "artist",
//               "uri": "spotify:artist:5Pwc4xIPtQLFEnJriah9YJ"
//             }
//           ],
//           "available_markets": [
//             "AD",

//           ],
//           "disc_number": 1,
//           "duration_ms": 257266,
//           "explicit": false,
//           "external_ids": {
//             "isrc": "USUM71301306"
//           },
//           "external_urls": {
//             "spotify": "https://open.spotify.com/track/2tpWsVSb9UEmDRxAl1zhX1"
//           },
//           "href": "https://api.spotify.com/v1/tracks/2tpWsVSb9UEmDRxAl1zhX1",
//           "id": "2tpWsVSb9UEmDRxAl1zhX1",
//           "is_local": false,
//           "name": "Counting Stars",
//           "popularity": 85,
//           "preview_url": "https://p.scdn.co/mp3-preview/9b9ff79922b53a8a5d647603a844e31a3f167150?cid=dd1a9ad2e7a94f48987e5f025acc9279",
//           "track_number": 1,
//           "type": "track",
//           "uri": "spotify:track:2tpWsVSb9UEmDRxAl1zhX1"
//         },
//         "played_at": "2022-01-01T12:49:06.552Z",
//         "context": null
//       },
