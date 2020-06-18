module.exports = {
	name: 'skip',
	description: 'Creates the DJ\'s Playing Message',
  async execute(message, botData) {
		const updateMessage = require('../util/updateMessage.js')

    const index = message.content.substring(6);
    console.log(index)
    if (message.member.voiceChannel != botData.voiceChannel) {
      botData.currentReply = "[" + message.author + "] You have to be in " + botData.botName + " Lounge to skip the music!"
      return updateMessage.execute(botData)
    }
    if (botData.songs.length == 1 || botData.songs.length == 0) {
      botData.currentReply = "[" + message.author + "] There is no song that I could skip too!"
      return updateMessage.execute(botData)
    }

    if (!index) {
      botData.connection.dispatcher.end();
    }

    else {
      if (index >= botData.songs.length || index < 1) {
        botData.currentReply = "[" + message.author + "] You cannot skip to a song that is not in the playlist"
        return updateMessage.execute(botData)
      }
      var song = botData.songs[index]
      var requester = botData.requesters[index]

      var song1 = botData.songs[0]
      var requester1 = botData.requesters[0]

      await botData.songs.splice(index,1)
      await botData.requesters.splice(index,1)

      botData.songs.splice(1, 0, song, )

      botData.requesters.splice(1, 0, requester)

      botData.connection.dispatcher.end();
    }
  }
}
