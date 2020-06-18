module.exports = {
	name: 'execute',
	description: 'Plays the music or adds it to the Queue.',

	async execute(client, message, botData) {
		var fs = require('fs')
		const ytsr = require("ytsr")
		const ytdl = require("ytdl-core");

    //const updateMessageFile = fs.readdirSync('../DJ_Sparky/util').filter(file => file.endsWith('updateMessage.js'));
		//const playSongFile = fs.readdirSync('../DJ_Sparky/util').filter(file => file.endsWith('playSong.js'));
		const playSong = require('../util/playSong.js')
		const queueToString = require('../util/queueToString.js')
		const updateMessage = require('../util/updateMessage.js')
		const getSongInfo = require('../util/getSongInfo.js')

		const args = message.content.substring(6);

		// pass args through language filter

    const userChannel = message.member.voiceChannel;

    if (!args) {
      botData.currentReply = "[" + message.author + "] You need to include a song name or url when using the play command!"
      return updateMessage.execute(botData)
    }

    if (userChannel != botData.voiceChannel) {
      botData.currentReply = "[" + message.author + "] You need to be in the " + botData.botName + " voice channel to play music!"
      return updateMessage.execute(botData)
    }

    const permissions = botData.voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      botData.currentReply = "[" + message.author + "] I need the permissions to join and speak in your voice channel!"
      return updateMessage.execute(botData)
    }

    if (botData.textChannel != message.channel) {
      botData.currentReply = "[" + message.author + "] You need to be in the " + botData.botName + " contoller channel to run commands"
      return updateMessage.execute(botData)
    }

    var song;

    try {
      if (args.startsWith("https://") && args.match(/spotify/g)) {
        botData.currentReply = "[" + message.author + "] Spotify Links are not accepted"
        return updateMessage.execute(botData)
      }



      if (args.startsWith("https://")) {
        song = await getSongInfo.execute(args, "YT_URL")
      }

      else {
        song = await getSongInfo.execute(args, "Name")
      }
      if (botData.songs.length == 0) {

         //queue.set(message.guild.id, botData);

         botData.songs.push(song);
         botData.requesters.push(message.author);

         try {
           var connection = await botData.voiceChannel.join();
           botData.connection = connection;
           playSong.execute(message, botData.songs[0], botData.requesters[0], botData);
         } catch (err) {
           console.log(err);
					 botData.currentReply = `[${message.author}] I failed to play that Song.`
	         return updateMessage.execute(botData)
         }
       } else {
         botData.songs.push(song);
         botData.requesters.push(message.author);
         botData.currentQueue = await queueToString.execute(botData);
				 botData.currentReply = "";
         return updateMessage.execute(botData)
       }
    }
    catch (err) {
      console.log(err)
      botData.currentReply = "[" + message.author + "] I could not find that song"
      updateMessage.execute(botData)
    }
	}
}
