module.exports = {
	name: 'getPlaylistInfo',
	description: 'Joins the DJ\'s Voice Channel',

	async execute(botData, args, requester, type) {
		const ytsr = require("ytsr")
		const ytdl = require("ytdl-core");

		console.log("Load")
		if (type === "YT_PLAYLIST") {
			var ytpl = require('ytpl');
			console.log("YT Playlist")
			var res = await ytpl(args)
			//console.log(res['items'])
			for (const info of res['items']) {
				if (info.title != '[Deleted video]') {
					const song = {
						title: info.title,
						url: info.url,
						duration: info.duration
					}
					botData.songs.push(song)
					botData.requesters.push(requester)
				}
			}
		}
	}
}
