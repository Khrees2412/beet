const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
	},
	display_name: {
		type: String,
		unique: true,
	},
	profile_link: {
		type: String,
		unique: true,
	},
	avatar: {
		type: String,
	},
	about: {
		type: String,
		default: "",
		maxLength: 75,
	},
	genres: [
		{
			type: String,
		},
	],
	followers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	recently_played: [
		{
			name: String,
			id: String,
			url: String,
			artists: [
				{
					url: String,
					name: String,
				},
			],
			duration_ms: String,
			preview_url: String,
			played_at: String,
			popularity: String,
		},
	],
	currently_playing: {
		url: String,
		name: String,
		id: String,
		type: String,
		current_time: Number,
		progress: Number,
		is_playing: String,
		popularity: Number,
		artists: [
			{
				url: String,
				name: String,
			},
		],
		duration: Number,
		preview_url: String,
		description: String,
		image: String,
	},
	playback: [
		{
			url: String,
			name: String,
			id: String,
			type: String,
			current_time: Number,
			progress: Number,
			popularity: Number,
			is_playing: String,
			artists: [
				{
					url: String,
					name: String,
				},
			],
			duration: Number,
			preview_url: String,
			description: String,
			image: String,
		},
	],
	albums: [
		{
			name: String,
			url: String,
			id: String,
			label: String,
			popularity: String,
			artist: [
				{
					url: String,
					name: String,
				},
			],
			total_tracks: Number,
			image: String,
			genres: [
				{
					type: String,
				},
			],
		},
	],
	playlists: [
		{
			name: String,
			url: String,
			description: String,
			owner: String,
			total_tracks: Number,
			image: String,
		},
	],
	followed_artists: [
		{
			name: String,
			id: String,
			url: String,
			followers: Number,
			genres: [
				{
					type: String,
				},
			],
			image: String,
		},
	],
	top_artists: [
		{
			name: String,
			id: String,
			url: String,
			followers: Number,
			genres: [
				{
					type: String,
				},
			],
			image: String,
		},
	],
	top_tracks: [
		{
			name: String,
			id: String,
			url: String,
			image: String,
			artists: [
				{
					url: String,
					name: String,
				},
			],
			preview_url: String,
			duration: String,
			popularity: String,
		},
	],
});

UserSchema.path("genres").validate((value) => {
	if (value.length > 5) {
		throw new Error("Genres' size can't be greater than 5!");
	}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
