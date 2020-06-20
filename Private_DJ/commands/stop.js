module.exports = {
	name: 'stop',
	description: 'Creates the DJ\'s Playing Message',
  async execute(message, botData) {
		const updateMessage = require('../util/updateMessage.js')

    if (message.member.voiceChannel != botData.voiceChannel) {
      botData.currentReply = "[" + message.author + "] You have to be in " + botData.botName + " Lounge to stop the music!"
      return updateMessage.execute(botData)
    }
    if (botData.songs.length > 0) {
      botData.songs = [];
			botData.currentReply = "";
			botData.repeat = 0;
      botData.connection.dispatcher.end();
    }
    else {
      botData.currentReply = "[" + message.author + "] I am not currently playing music"
      return updateMessage.execute(botData)
    }
    //delete botData;
  }
}
