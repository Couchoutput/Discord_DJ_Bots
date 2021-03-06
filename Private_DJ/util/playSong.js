module.exports = {
	name: 'playSong',
	description: 'Plays the music or adds it to the Queue.',

	async execute(message, song, requester, botData) {
    const ytdl = require("ytdl-core");
    const updateMessage = require('./updateMessage.js')
		const timeToString = require('./timeToString.js')
		const queueToString = require('./queueToString.js')
    //const guild = message.guild
    //const botData = queue.get(guild.id);
    if (!song) {
      //botData.voiceChannel.leave();
      //queue.delete(guild.id);
      return;
    }

    const dispatcher = botData.connection

    //dispatcher.setVolumeDecibels(60)
    dispatcher.playStream(ytdl(song.url, {quality: 'highestaudio'}), { filter : 'audioonly'}).on("end", () => {

				// If on repeat, take current song and push to end
				if (botData.repeat == 1) {
					botData.songs.push(botData.songs.shift())
					botData.requesters.push(botData.requesters.shift())
				}
				else {
					botData.songs.shift();
	        botData.requesters.shift();
				}

        if (botData.songs.length == 0) {
					botData.client.user.setActivity('')

          botData.currentSong = "No Songs to Play";
          botData.currentQueue = "No Songs in Queue"
					botData.offset = 1
					botData.react = 0
					botData.page = 1
					botData.pages = 1
          updateMessage.execute(botData)
          //queueMessage(botData.textChannel, botData.queue, "No Songs in Queue")
        }
        else {
					if (botData.songs.length < botData.offset) {
						botData.offset -= 10;
					}
          module.exports.execute(message, botData.songs[0], botData.requesters[0], botData);
        }
    }).on("error", async error => {
			console.error("Voice Channel is gone. reseting")
			module.exports.execute(message, botData.songs[0], botData.requesters[0], botData);
		});

    dispatcher.dispatcher.setVolumeLogarithmic(botData.volume / 5);

		botData.client.user.setActivity(' some music!', { type: 'PLAYING' })

    var text = "[" + song.title +"](" + song.url + ") [" + requester + "] " + await timeToString.execute(song.duration);
    botData.currentSong = text;
    botData.currentQueue = await queueToString.execute(botData);
    botData.currentReply = "";
    updateMessage.execute(botData)

  }
  }
