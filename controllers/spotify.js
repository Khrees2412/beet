const spotifyApi = require("../spotify");

const recentlyPlayed = async (req, res) => {
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
};

const albums = async (req, res) => {
	try {
		const albums = await spotifyApi.getMySavedAlbums({
			limit: 10,
		});
		const data = [];

		albums.body.items.forEach((item) => {
			const _a = item.album.artists.map((artist) => {
				const _artist = {
					name: artist.name,
					url: artist.href,
				};
				return _artist;
			});

			const a = {
				name: item.album.name,
				label: item.album.label,
				artist: _a,
				url: item.album.external_urls.spotify,
				total_tracks: item.album.total_tracks,
				image: item.album.images[0].url,
				genres: item.album.genres,
			};
			data.push(a);
		});
		res.json({
			data,
		});
	} catch (error) {
		res.json(error);
	}
};

const playlists = async (req, res) => {
	try {
		const playlists = await spotifyApi.getUserPlaylists({
			limit: 10,
		});
		const data = [];
		playlists.body.items.map((playlist) => {
			const list = {
				name: playlist.name,
				url: playlist.external_urls.spotify,
				description: playlist.description,
				owner: playlist.owner.display_name,
				track_number: playlist.tracks.total,
				image_url: playlist.images[0].url,
			};
			data.push(list);
		});
		res.json({
			data,
		});
	} catch (error) {
		res.json(error);
	}
};

const followedArtists = async (req, res) => {
	try {
		const followedArtists = await spotifyApi.getFollowedArtists({
			limit: 3,
		});
		res.json({
			data: followedArtists.body,
		});
	} catch (error) {
		res.json(error);
	}
};

const topArtists = async (req, res) => {
	try {
		const topArtists = await spotifyApi.getMyTopArtists({
			limit: 3,
		});
		res.json({
			data: topArtists.body,
		});
	} catch (error) {
		res.json(error);
	}
};

const currentlyPlaying = async (req, res) => {
	try {
		const track = await spotifyApi.getMyCurrentPlayingTrack();
		const type = track.body.currently_playing_type;
		let song = {
			valid: true,
			url: track.body.item.external_urls.spotify,
			name: track.body.item.name,
			current_time: track.body.timestamp,
			progress: track.body.progress_ms,
			is_playing: track.body.is_playing,
			artists: track.body.item.artists,
			duration: track.body.item.duration_ms,
			preview_url: track.body.item.preview_url,
			description: track.body.item.description,
		};
		// switch (type) {
		// 	case "track":
		// 		song = {
		// 			valid: true,
		// 			url: track.body.item.external_urls.spotify,
		// 			name: track.body.item.name,
		// 			current_time: track.body.timestamp,
		// 			progress: track.body.progress_ms,
		// 			is_playing: track.body.is_playing,
		// 			artists: track.body.item.artists,
		// 			duration: track.body.item.duration_ms,
		// 			preview_url: track.body.item.preview_url,
		// 		};
		// 		break;
		// 	case "episode":
		// 		song = {
		// 			valid: true,
		// 			url: track.body.item.external_urls.spotify,
		// 			name: track.body.item.name,
		// 			current_time: track.body.timestamp,
		// 			progress: track.body.progress_ms,
		// 			is_playing: track.body.is_playing,
		// 			artists: track.body.item.artists,
		// 			duration: track.body.item.duration_ms,
		// 			preview_url: track.body.item.preview_url,
		// 			description: track.body.item.description,
		// 		};
		// 		break;
		// 	case "ad":
		// 		song = {
		// 			valid: false,
		// 		};
		// 		break;
		// 	case "unknown":
		// 		song = {
		// 			valid: false,
		// 		};
		// 		break;
		// 	default:
		// 		break;
		// }

		res.json({
			data: song,
		});
	} catch (error) {
		res.json(error);
	}
};

module.exports = {
	recentlyPlayed,
	albums,
	playlists,
	followedArtists,
	topArtists,
	currentlyPlaying,
};
