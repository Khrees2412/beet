const spotifyApi = require("../spotify");
const User = require("../models/user");

const recentlyPlayed = async (req, res) => {
	try {
		const tracks = await spotifyApi.getMyRecentlyPlayedTracks({
			limit: 10,
		});
		const id = req.cookies?.user_id;

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
				id: track.id,
				url: track.external_urls.spotify,
				artists: a,
				duration_ms: track.duration_ms,
				preview_url: track.preview_url,
				played_at: played_at,
				popularity: track.popularity,
			};
			data.push(song);
		});
		// const user = User.
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
				url: item.album.external_urls.spotify,
				id: item.album.id,
				label: item.album.label,
				artist: _a,
				total_tracks: item.album.total_tracks,
				image: item.album.images[0].url,
				genres: item.album.genres,
				popularity: item.album.popularity,
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
				total_tracks: playlist.tracks.total,
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
		const followedArtists = await spotifyApi.getFollowedArtists();
		const data = [];
		followedArtists.body.artists.items.forEach((item) => {
			const artist = {
				name: item.name,
				id: item.id,
				url: item.external_urls.spotify,
				followers: item.followers.total,
				genres: item.genres,
				image: item.images[0].url,
			};
			data.push(artist);
		});
		res.json({
			data,
		});
	} catch (error) {
		res.json(error);
	}
};

const topArtists = async (req, res) => {
	try {
		const topArtists = await spotifyApi.getMyTopArtists({
			limit: 20,
		});
		const data = [];
		topArtists.body.items.forEach((item) => {
			const artist = {
				name: item.name,
				id: item.id,
				url: item.external_urls.spotify,
				followers: item.followers.total,
				genres: item.genres,
				image: item.images[0].url,
			};
			data.push(artist);
		});
		res.json({
			data,
		});
	} catch (error) {
		res.json(error);
	}
};
const topTracks = async (req, res) => {
	try {
		const topTracks = await spotifyApi.getMyTopTracks({
			limit: 20,
		});
		const data = [];
		topTracks.body.items.forEach((item) => {
			const a = item.artists.map((artist) => {
				const _artist = {
					name: artist.name,
					url: artist.href,
				};
				return _artist;
			});

			const track = {
				name: item.name,
				id: item.id,
				url: item.external_urls.spotify,
				image: item.album.images[0].url,
				artists: a,
				preview_url: item.preview_url,
				duration: item.duration_ms,
				popularity: item.popularity,
			};
			data.push(track);
		});
		res.json({
			data,
			// topTracks,
		});
	} catch (error) {
		res.json(error);
	}
};

const currentlyPlaying = async (req, res) => {
	try {
		const track = await spotifyApi.getMyCurrentPlayingTrack();
		const song = {
			url: track.body.item.external_urls.spotify,
			name: track.body.item.name,
			id: track.body.item.id,
			type: track.body.currently_playing_type,
			current_time: track.body.timestamp,
			progress: track.body.progress_ms,
			is_playing: track.body.is_playing,
			popularity: track.body.item.popularity,
			artists: track.body.item.artists,
			duration: track.body.item.duration_ms,
			preview_url: track.body.item.preview_url,
			description: track.body.item.description,
			image: track.body.item.images[0].url,
		};

		res.json({
			data: song,
		});
	} catch (error) {
		res.json(error);
	}
};

const playback = async (req, res) => {
	try {
		const track = await spotifyApi.getMyCurrentPlaybackState();
		const song = {
			url: track.body.item.external_urls.spotify,
			name: track.body.item.name,
			id: track.body.item.id,
			type: track.body.currently_playing_type,
			current_time: track.body.timestamp,
			progress: track.body.progress_ms,
			is_playing: track.body.is_playing,
			artists: track.body.item.artists,
			duration: track.body.item.duration_ms,
			preview_url: track.body.item.preview_url,
			description: track.body.item.description,
			image: track.body.item.images[0].url,
			popularity: track.body.item.popularity,
		};

		res.json({
			data: song,
		});
	} catch (error) {
		res.json(error);
	}
};

const addToAlbums = async (req, res) => {
	try {
		const albumID = req.body.albumID;
		const response = await spotifyApi.addToMySavedAlbums(albumID);
		res.json({
			success: true,
			response,
		});
	} catch (error) {
		res.json(error);
	}
};

const addToTracks = async (req, res) => {
	try {
		const trackID = req.body.trackID;
		const response = await spotifyApi.addToMySavedTracks(trackID);
		res.json({
			success: true,
			response,
		});
	} catch (error) {
		res.json(error);
	}
};

const followPlaylist = async (req, res) => {
	try {
		const playlistID = req.body.playlistID;
		const response = await spotifyApi.followPlaylist(playlistID);
		res.json({
			success: true,
			response,
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
	topTracks,
	currentlyPlaying,
	playback,
	addToAlbums,
	addToTracks,
	followPlaylist,
};
