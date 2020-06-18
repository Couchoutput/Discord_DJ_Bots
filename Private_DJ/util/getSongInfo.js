module.exports = {
	name: 'getSongInfo',
	description: 'Joins the DJ\'s Voice Channel',

	async execute(args, type) {
		const ytsr = require("ytsr")
		const ytdl = require("ytdl-core");
		const ytlist = require('youtube-playlist');

		if (type === "YT_URL") {
			const songInfo = await ytdl.getInfo(args);

			song = {
			 title: songInfo.title,
			 url: songInfo.video_url,
			 duration: songInfo.length_seconds
			 };
	 	}

		else {
			const songInfo = await ytsr(args);

			i = 0;
			// Look for the first item that is labeled as a Video
			while (songInfo["items"][i].type != 'video') {
				i++;
			}
			//console.log(songInfo["items"][i])
			song = {
			 title: songInfo["items"][i].title,
			 url: songInfo["items"][i].link,
			 duration: songInfo["items"][i].duration
			 };
		}

		return song;
  }
}
